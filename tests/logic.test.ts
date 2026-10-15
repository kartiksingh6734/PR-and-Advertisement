import { test } from "node:test";
import assert from "node:assert/strict";
import { recommend, questions } from "../src/lib/assessment";
import { enquirySchema } from "../src/lib/enquiry";
import { paymentUrl, safeUrl, plans } from "../src/lib/config";
import { services, industries } from "../src/lib/content";
test("low budget gets assessment, not recurring commitment", () => {
  const r = recommend([
    "Manufacturing/B2B",
    "Getting customers",
    "Under ₹5,000",
    "Operating but struggling",
    "More enquiries",
  ]);
  assert.equal(r.plan, "Growth Audit");
  assert.ok(r.services.includes("B2B Lead Generation"));
});
test("budget tiers and priorities influence recommendation", () => {
  for (let i = 1; i < 4; i++) {
    const r = recommend([
      "Startup",
      "Launching a business/product",
      questions[2].options[i],
      "Just starting",
      "Better branding",
    ]);
    assert.equal(
      r.plan,
      ["", "Essential Growth", "Business Growth", "Growth Partner+"][i],
    );
    assert.ok(r.services.includes("Product & Business Launches"));
    assert.ok(r.services.includes("Branding & Graphic Design"));
  }
});
test("all question combinations produce valid recommendations", () => {
  let count = 0;
  function walk(a: string[]) {
    if (a.length === 5) {
      const r = recommend(a);
      assert.ok(plans.some((p) => p.name === r.plan));
      assert.ok(r.services.every((n) => services.some((s) => s.name === n)));
      count++;
      return;
    }
    for (const o of questions[a.length].options) walk([...a, o]);
  }
  walk([]);
  assert.equal(count, 2880);
});
test("incomplete assessment is rejected", () =>
  assert.throws(() => recommend(["Startup"])));
test("only official HTTPS hosted Razorpay links allowed", () => {
  assert.equal(paymentUrl("https://rzp.io/i/abc"), "https://rzp.io/i/abc");
  for (const u of [
    "http://rzp.io/x",
    "https://rzp.io.evil.com/x",
    "javascript:alert(1)",
    "https://example.com",
  ])
    assert.equal(paymentUrl(u), "");
  assert.equal(safeUrl("javascript:alert(1)"), "");
});
const enquiry = {
  name: "Test Owner",
  business: "Test Business",
  email: "owner@example.com",
  phone: "+919876543210",
  category: "Retail",
  service: "growth-plan",
  budget: "Under ₹5,000",
  message: "A business enquiry for a new local shop.",
  date: "",
  consent: true,
  website: "",
  plan: "Essential Growth",
  assessment: "",
};
test("enquiry accepts valid data and rejects spam, missing consent and invalid email", () => {
  assert.ok(enquirySchema.safeParse(enquiry).success);
  for (const patch of [
    { consent: false },
    { email: "invalid" },
    { website: "spam" },
    { message: "hi" },
    { date: "2020-01-01" },
  ])
    assert.equal(
      enquirySchema.safeParse({ ...enquiry, ...patch }).success,
      false,
    );
});
test("industry and service references resolve", () => {
  assert.equal(new Set(services.map((s) => s.slug)).size, 12);
  for (const i of industries)
    for (const s of i.services) assert.ok(services.some((v) => v.slug === s));
});
