import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";
export const runtime = "nodejs";
const attempts = new Map<string, { count: number; reset: number }>();
async function limited(ip: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL,
    token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const key = `enquiry:${ip}:${Math.floor(Date.now() / 600000)}`;
    const response = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, 600],
      ]),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Rate limit unavailable");
    const data = await response.json();
    if (typeof data[0]?.result !== "number")
      throw new Error("Rate limit unavailable");
    return data[0].result > 5;
  }
  if (process.env.VERCEL_ENV === "production")
    throw new Error("Configure shared rate limiting");
  const now = Date.now();
  for (const [key, value] of attempts) {
    if (value.reset < now) attempts.delete(key);
  }
  const current = attempts.get(ip) || { count: 0, reset: now + 600000 };
  current.count++;
  attempts.set(ip, current);
  return current.count > 5;
}
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  // Next may normalize nextUrl to the bind address behind a proxy. The browser's
  // Origin must match the actual HTTP Host and request protocol, not the bind IP.
  const expectedOrigin = `${req.nextUrl.protocol}//${req.headers.get("host") || req.nextUrl.host}`;
  if (!origin || origin !== expectedOrigin)
    return NextResponse.json(
      { message: "Request origin is not allowed." },
      { status: 403 },
    );
  if (!req.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ message: "Expected JSON." }, { status: 415 });
  try {
    const reader = req.body?.getReader();
    if (!reader)
      return NextResponse.json({ message: "Empty enquiry." }, { status: 400 });
    let bytes = 0;
    let body = "";
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16000) {
        await reader.cancel();
        return NextResponse.json(
          { message: "Enquiry is too large." },
          { status: 413 },
        );
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    const parsed = enquirySchema.safeParse(JSON.parse(body));
    if (!parsed.success)
      return NextResponse.json(
        { message: "Please check the enquiry fields and consent." },
        { status: 400 },
      );
    const ip =
      req.headers.get("x-vercel-forwarded-for")?.split(",")[0] || "local";
    if (await limited(ip))
      return NextResponse.json(
        { message: "Too many enquiries. Please try again in ten minutes." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    const key = process.env.RESEND_API_KEY,
      from = process.env.RESEND_FROM_EMAIL,
      to = process.env.ENQUIRY_TO_EMAIL;
    if (!key || !from || !to)
      return NextResponse.json(
        {
          message:
            "Online enquiry delivery is not configured. Your message has not been sent. Please use a configured direct contact option or return later.",
        },
        { status: 503 },
      );
    const d = parsed.data;
    const text = Object.entries(d)
      .filter(([k]) => !["website", "consent"].includes(k))
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n\n");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: d.email,
        subject: "New business growth enquiry",
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return NextResponse.json(
        {
          message:
            "The email provider could not accept your enquiry. Your message has not been confirmed as sent. Please try a direct contact option.",
        },
        { status: 502 },
      );
    return NextResponse.json({
      message:
        "Your enquiry has been accepted for email delivery. Thank you — we’ll review your request.",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Your enquiry could not be processed. Please try again later or use a configured direct contact option.",
      },
      { status: 503 },
    );
  }
}
