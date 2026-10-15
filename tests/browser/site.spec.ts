import { test, expect } from "@playwright/test";
import { services, industries } from "../../src/lib/content";
test("all pages render and internal links resolve", async ({ request }) => {
  const paths = [
    "/",
    "/about",
    "/services",
    "/industries",
    "/pricing",
    "/how-we-work",
    "/contact",
    "/growth-plan-finder",
    "/faqs",
    "/privacy",
    "/terms",
    ...services.map((s) => `/services/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
  ];
  const links = new Set<string>();
  for (const path of paths) {
    const r = await request.get(path);
    expect(r.status(), path).toBe(200);
    const html = await r.text();
    expect(html).toContain("<h1");
    for (const match of html.matchAll(/href="(\/[^"#]*)"/g)) {
      if (!match[1].startsWith("/_next/"))
        links.add(match[1].replaceAll("&amp;", "&"));
    }
  }
  for (const link of links)
    expect((await request.get(link)).status(), link).toBe(200);
  expect((await request.get("/missing-page")).status()).toBe(404);
});
test("service search, category filter and FAQ", async ({ page }) => {
  await page.goto("/services");
  await page.getByRole("button", { name: "Creative", exact: true }).click();
  await expect(page.getByText("2 services", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByLabel("Search services").fill("website");
  await expect(page.getByText("1 services", { exact: true })).toBeVisible();
  await page.goto("/faqs");
  await page
    .locator("summary")
    .filter({ hasText: "Can you guarantee media coverage?" })
    .click();
  await expect(page.getByText(/Editorial decisions belong/)).toBeVisible();
});
test("finder completion and plan prefilling", async ({ page }) => {
  await page.goto("/growth-plan-finder");
  for (const option of [
    "Manufacturing/B2B",
    "Getting customers",
    "Under ₹5,000",
    "Operating but struggling",
    "More enquiries",
  ]) {
    await page.getByRole("radio", { name: option }).check();
    await page
      .getByRole("button", { name: /Continue|See my recommendation/ })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "Growth Audit", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator(".result").getByText("B2B Lead Generation", { exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Send my assessment" }).click();
  await expect(page.getByText("Enquiring about:")).toBeVisible();
  await expect(page.getByText("Growth Audit", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Your assessment", { exact: true }),
  ).toBeVisible();
});
test("contact validates and unconfigured email returns honest failure", async ({
  page,
}) => {
  await page.goto("/contact?plan=Business%20Growth");
  await page.getByRole("button", { name: "Send My Enquiry" }).click();
  await expect(page.getByText("Enter your full name.")).toBeVisible();
  await page.getByLabel("Full Name").fill("Test Owner");
  await page.getByLabel("Business Name").fill("Test Shop");
  await page.getByLabel("Email Address").fill("owner@example.com");
  await page.getByLabel("Phone / WhatsApp Number").fill("+919876543210");
  await page.getByLabel("Business Category").selectOption({ index: 1 });
  await page.getByLabel("Service Interested In").selectOption("growth-plan");
  await page.getByLabel("Estimated Budget").selectOption({ index: 1 });
  await page
    .getByLabel("Tell us about your business")
    .fill("We want to plan a launch for our new local shop.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send My Enquiry" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "not configured" }),
  ).toBeVisible();
});
test("responsive layout, images and mobile navigation", async ({ page }) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/pricing",
      "/contact",
      "/growth-plan-finder",
      "/services",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${path} at ${width}`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "Pricing", exact: true })
    .click();
  await expect(page).toHaveURL(/pricing/);
  await page.goto("/");
  await expect(page.locator(".hero-art img")).toBeVisible();
  expect(
    await page
      .locator(".hero-art img")
      .evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth > 0),
  ).toBe(true);
  await page.screenshot({ path: "/tmp/elevora-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "/tmp/elevora-desktop.png", fullPage: true });
});
test("API rejects invalid, cross-origin and oversized submissions", async ({
  request,
}) => {
  expect((await request.post("/api/enquiry", { data: {} })).status()).toBe(403);
  expect(
    (
      await request.post("/api/enquiry", {
        headers: { Origin: "http://127.0.0.1:3000" },
        data: {},
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/enquiry", {
        headers: { Origin: "http://127.0.0.1:3000" },
        data: { message: "a".repeat(17000) },
      })
    ).status(),
  ).toBe(413);
});

test("accessibility basics and keyboard navigation", async ({ page }) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  for (const path of [
    "/",
    "/contact",
    "/growth-plan-finder",
    "/pricing",
    "/services",
  ]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
      path,
    ).toEqual([]);
  }
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  const dropdown = page.locator(".nav-dropdown summary");
  await dropdown.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".nav-dropdown")).toHaveAttribute("open", "");
});

test("unconfigured payment links request plans instead of checkout", async ({
  page,
}) => {
  await page.goto("/pricing");
  await expect(
    page.getByRole("link", { name: "Purchase via Razorpay" }),
  ).toHaveCount(0);
  const plan = page
    .getByRole("article")
    .filter({
      has: page.getByRole("heading", { name: "Essential Growth", exact: true }),
    });
  await plan.getByRole("link", { name: "Request This Plan" }).click();
  await expect(page).toHaveURL(/plan=Essential/);
  await expect(
    page.getByText("Essential Growth", { exact: true }),
  ).toBeVisible();
});
