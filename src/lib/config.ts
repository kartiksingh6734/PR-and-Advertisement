export const brand = {
  name: "Elevora Growth",
  tagline: "Your Business. Our Growth Mission.",
  description:
    "Everything your business needs to grow, coordinated in one place.",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  location: process.env.NEXT_PUBLIC_OFFICE_LOCATION || "",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "",
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
};
export const navigation = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["How We Work", "/how-we-work"],
  ["Pricing", "/pricing"],
  ["Contact", "/contact"],
];
export const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export function safeUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === "https:" ? u.href : "";
  } catch {
    return "";
  }
}
export function paymentUrl(value: string) {
  const url = safeUrl(value);
  return url && ["rzp.io", "pages.razorpay.com"].includes(new URL(url).hostname)
    ? url
    : "";
}
export const plans = [
  {
    id: "audit",
    name: "Growth Audit",
    price: 1999,
    period: "one-time",
    description: "A clear starting point before you invest.",
    features: [
      "Discovery questionnaire",
      "Up to 45-minute consultation",
      "Business growth assessment",
      "Priority recommendations",
      "30-day action roadmap",
      "Written summary",
    ],
    excluded: "Assessment only; implementation is not included.",
    paymentLink: "",
  },
  {
    id: "essential",
    name: "Essential Growth",
    price: 4999,
    period: "/month",
    description: "A focused foundation for small local businesses.",
    features: [
      "Initial business review",
      "One monthly planning call",
      "Monthly action roadmap",
      "Up to 3 hours of coordination support",
      "Up to 2 provider quote requests",
      "Basic progress tracking",
      "Monthly activity summary",
    ],
    excluded:
      "Advertising spend, creative production, third-party fees and unlimited requests are excluded.",
    paymentLink: "",
  },
  {
    id: "business",
    name: "Business Growth",
    price: 11999,
    period: "/month",
    description: "Bring your strategy and specialists together.",
    features: [
      "Detailed growth assessment",
      "Personalised growth roadmap",
      "Two strategy/check-in calls per month",
      "Up to 8 hours of coordination support",
      "Management of one active growth campaign",
      "Up to 5 provider quote requests",
      "Selected specialist partner coordination",
      "Monthly performance summary",
      "Lead and enquiry tracking setup where feasible",
    ],
    excluded:
      "Third-party fees and media spend are extra unless included in a written quote.",
    paymentLink: "",
  },
  {
    id: "partner",
    name: "Growth Partner+",
    price: 24999,
    period: "/month",
    description: "Ongoing coordination for your next chapter.",
    features: [
      "Dedicated primary point of contact",
      "Up to 18 hours of monthly coordination",
      "Weekly strategy/check-in calls",
      "Up to 2 concurrent campaigns",
      "Multiple specialist provider coordination",
      "Up to 8 provider quote requests",
      "Priority scheduling",
      "Monthly business growth review",
      "Enhanced performance reporting",
    ],
    excluded: "External implementation costs remain separate.",
    paymentLink: "",
  },
  {
    id: "enterprise",
    name: "Custom Enterprise",
    price: 0,
    period: "",
    description: "A tailored scope for complex business needs.",
    features: [
      "PR and multi-channel marketing",
      "Events and launches",
      "Partner development",
      "B2B outreach",
      "Multi-service campaigns",
      "Growth strategy",
    ],
    excluded: "Scope, fees and third-party costs agreed in writing.",
    paymentLink: "",
  },
];
export const projectRates = [
  ["Business Growth Audit", plans[0].price, ""],
  ["Brand Identity Design", 9999, ""],
  ["Social Media Strategy & Coordination", 6999, "/month"],
  ["Paid Advertising Management", 7999, "/month · ad spend extra"],
  ["PR Campaign Planning & Outreach", 12999, "/campaign"],
  ["Landing Page Development", 14999, ""],
  ["Business Website Development", 29999, ""],
  ["Influencer Campaign Coordination", 5999, " · creator fees extra"],
  ["Event Coordination", 14999, " · event costs extra"],
  ["B2B Outreach Setup", 9999, ""],
  ["Product Launch Coordination", 14999, ""],
] as const;

export const serviceRates: Record<string, { price: number; period: string }> = {
  "business-growth-strategy": { price: projectRates[0][1], period: "audit" },
  "public-relations": { price: projectRates[4][1], period: "/campaign" },
  "social-media-marketing": { price: projectRates[2][1], period: "/month" },
  "paid-advertising": { price: projectRates[3][1], period: "/month" },
  "branding-design": { price: projectRates[1][1], period: "" },
  "content-production": { price: 0, period: "" },
  "influencer-marketing": { price: projectRates[7][1], period: "" },
  "website-development": { price: projectRates[6][1], period: "" },
  "product-launches": { price: projectRates[10][1], period: "" },
  "event-management": { price: projectRates[8][1], period: "" },
  "business-partnerships": { price: 0, period: "" },
  "b2b-lead-generation": { price: projectRates[9][1], period: "setup" },
};
