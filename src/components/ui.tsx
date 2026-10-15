import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { brand, money, paymentUrl, plans } from "@/lib/config";
import { faqs, services } from "@/lib/content";
export function Button({
  children,
  href = "/contact",
  secondary = false,
}: {
  children: React.ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function PageHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-header container">
      <div className="breadcrumb">
        <Link href="/">Home</Link> / {eyebrow}
      </div>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
export function CTASection() {
  return (
    <section className="cta container">
      <span className="eyebrow">A CONVERSATION IS A GOOD START</span>
      <h2>Your Next Stage of Growth Starts With a Conversation.</h2>
      <Button>Let’s Grow Your Business</Button>
      <span className="cta-note">
        A clearer direction. An agreed scope. A practical next step.
      </span>
    </section>
  );
}
export function FAQAccordion({ limit }: { limit?: number }) {
  return (
    <div className="faq">
      {faqs.slice(0, limit).map(([q, a], i) => (
        <details key={q}>
          <summary>
            <span className="index">{String(i + 1).padStart(2, "0")}</span>
            {q}
            <span className="plus">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function PricingCard({ plan }: { plan: (typeof plans)[number] }) {
  const url = paymentUrl(plan.paymentLink);
  return (
    <article
      className={`price-card ${plan.id === "business" ? "recommended" : ""}`}
    >
      <div className="price-top">
        <span className="eyebrow">
          {plan.id === "business"
            ? "RECOMMENDED"
            : plan.id === "audit"
              ? "START WITH CLARITY"
              : "A PLAN WITH PURPOSE"}
        </span>
        <h3>{plan.name}</h3>
        <p>{plan.description}</p>
        <div className="price">
          {plan.price ? money(plan.price) : "Let’s talk"}
          <small>{plan.period}</small>
        </div>
      </div>
      <ul>
        {plan.features.map((f) => (
          <li key={f}>
            <Check size={15} />
            {f}
          </li>
        ))}
      </ul>
      <p className="small">{plan.excluded}</p>
      {url ? (
        <a
          className="button"
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          Purchase via Razorpay <ArrowUpRight size={16} />
        </a>
      ) : (
        <Button href={`/contact?plan=${encodeURIComponent(plan.name)}`}>
          Request This Plan
        </Button>
      )}
    </article>
  );
}
export function ServiceLinks({ slugs }: { slugs: string[] }) {
  return (
    <div className="service-grid">
      {services
        .filter((s) => slugs.includes(s.slug))
        .map((s) => (
          <Link
            className="service-card"
            href={`/services/${s.slug}`}
            key={s.slug}
          >
            <span className="eyebrow">{s.category}</span>
            <h3>{s.name}</h3>
            <p>{s.summary}</p>
            <ArrowUpRight size={22} />
          </Link>
        ))}
    </div>
  );
}
export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="brand-symbol">
        e<span>↗</span>
      </span>
      {brand.name}
      <span className="wordmark-dot">.</span>
    </span>
  );
}
