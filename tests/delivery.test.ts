import { test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/enquiry/route";
const payload = {
  name: "Test Owner",
  business: "Test Shop",
  email: "owner@example.com",
  phone: "+919876543210",
  category: "Retail",
  service: "growth-plan",
  budget: "Under ₹5,000",
  message: "Please help plan our local business launch.",
  date: "",
  consent: true,
  website: "",
  plan: "",
  assessment: "",
};
function req(ip: string) {
  return new NextRequest("http://localhost:3000/api/enquiry", {
    method: "POST",
    headers: {
      Origin: "http://localhost:3000",
      "Content-Type": "application/json",
      "x-vercel-forwarded-for": ip,
    },
    body: JSON.stringify(payload),
  });
}
test("provider states, shared limiter and abuse limit", async () => {
  const names = [
    "RESEND_API_KEY",
    "RESEND_FROM_EMAIL",
    "ENQUIRY_TO_EMAIL",
    "VERCEL_ENV",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
  ];
  const saved = Object.fromEntries(names.map((n) => [n, process.env[n]]));
  const original = global.fetch;
  try {
    for (const n of names) delete process.env[n];
    assert.equal((await POST(req("unconfigured"))).status, 503);
    process.env.RESEND_API_KEY = "test-only-not-a-real-key";
    process.env.RESEND_FROM_EMAIL = "Agency <agency@example.com>";
    process.env.ENQUIRY_TO_EMAIL = "owner@example.com";
    let sends = 0;
    global.fetch = async (input, init) => {
      assert.equal(input, "https://api.resend.com/emails");
      const email = JSON.parse(init?.body as string);
      assert.equal(email.reply_to, payload.email);
      assert.ok(email.text.includes(payload.message));
      sends++;
      return Response.json({ id: "test-id" });
    };
    const success = await POST(req("configured"));
    assert.equal(success.status, 200);
    assert.match((await success.json()).message, /accepted for email delivery/);
    assert.equal(sends, 1);
    global.fetch = async () =>
      Response.json({ error: "provider unavailable" }, { status: 500 });
    assert.equal((await POST(req("provider-error"))).status, 502);
    global.fetch = async () => {
      throw new Error("timeout");
    };
    assert.equal((await POST(req("timeout"))).status, 503);
    delete process.env.RESEND_API_KEY;
    for (let i = 0; i < 5; i++)
      assert.equal((await POST(req("rate-test"))).status, 503);
    assert.equal((await POST(req("rate-test"))).status, 429);
    process.env.VERCEL_ENV = "production";
    assert.equal((await POST(req("production-no-shared-limiter"))).status, 503);
    process.env.UPSTASH_REDIS_REST_URL = "https://limiter.example.com";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-only";
    global.fetch = async () => Response.json([{ result: 6 }, { result: 1 }]);
    assert.equal((await POST(req("shared-limit"))).status, 429);
  } finally {
    global.fetch = original;
    for (const n of names) {
      if (saved[n] === undefined) delete process.env[n];
      else process.env[n] = saved[n];
    }
  }
});
