import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import {
  PageHeader,
  SectionHeading,
  CTASection,
  Button,
  PricingCard,
  FAQAccordion,
  ServiceLinks,
} from "@/components/ui";
import { ServiceDirectory } from "@/components/interactive";
import { GrowthPlanFinder } from "@/components/finder";
import { ContactForm } from "@/components/contact-form";
import { brand, money, plans, projectRates, safeUrl } from "@/lib/config";
import { industries, services, steps } from "@/lib/content";
const pages: Record<string, [string, string]> = {
  about: [
    "A Bigger Picture for Your Business.",
    "One growth partner to connect your business needs, the right expertise and a practical way forward.",
  ],
  services: [
    "The Right Capabilities. Working Together.",
    "Explore coordinated services built around real business priorities.",
  ],
  industries: [
    "Your Business Has Its Own Story.",
    "A relevant growth approach starts with understanding your industry, customers and stage.",
  ],
  "how-we-work": [
    "Good Growth Starts With a Clear Method.",
    "The GrowthOS Method connects discovery, strategy, specialists and execution in one coordinated workflow.",
  ],
  pricing: [
    "Clarity on Scope. Confidence in Your Next Step.",
    "Transparent, provisional launch pricing for India. Choose coordination support or scope an individual project.",
  ],
  "growth-plan-finder": [
    "Find the Right Growth Strategy for Your Business.",
    "Five questions to identify a sensible starting point. No sign-up required.",
  ],
  contact: [
    "Let’s Talk About Growing Your Business.",
    "Tell us where you are, where you want to go and what is getting in the way.",
  ],
  faqs: [
    "Good Questions. Clear Answers.",
    "Understand our services, coordination model, pricing and next steps.",
  ],
  privacy: [
    "Privacy Policy",
    "Draft privacy notice. Requires owner and legal review before commercial launch.",
  ],
  terms: [
    "Terms & Conditions",
    "Draft service terms. Requires owner and legal review before commercial launch.",
  ],
};
export function generateStaticParams() {
  return [
    ...Object.keys(pages).map((s) => ({ slug: [s] })),
    ...services.map((s) => ({ slug: ["services", s.slug] })),
    ...industries.map((s) => ({ slug: ["industries", s.slug] })),
  ];
}
function resolve(slug: string[]) {
  if (slug.length === 1 && pages[slug[0]]) return pages[slug[0]];
  if (slug.length === 2) {
    const s =
      slug[0] === "services"
        ? services.find((s) => s.slug === slug[1])
        : slug[0] === "industries"
          ? industries.find((s) => s.slug === slug[1])
          : undefined;
    if (s) return [s.name, "summary" in s ? s.summary : s.challenge];
  }
  return undefined;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = resolve(slug);
  if (!p) return {};
  const url = "/" + slug.join("/");
  return {
    title: p[0],
    description: p[1],
    alternates: { canonical: url },
    openGraph: { title: `${p[0]} | ${brand.name}`, description: p[1], url },
    twitter: { card: "summary_large_image", title: p[0], description: p[1] },
  };
}
export default async function ContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const p = resolve(slug);
  if (!p) notFound();
  const key = slug.join("/");
  const query = await searchParams;
  const get = (k: string) =>
    typeof query[k] === "string" ? (query[k] as string) : "";
  const service =
    slug[0] === "services" && slug.length === 2
      ? services.find((s) => s.slug === slug[1])
      : undefined;
  const industry =
    slug[0] === "industries" && slug.length === 2
      ? industries.find((s) => s.slug === slug[1])
      : undefined;
  return (
    <>
      <PageHeader
        eyebrow={
          service
            ? "Our services"
            : industry
              ? "Our industries"
              : slug[0].replaceAll("-", " ")
        }
        title={p[0]}
        text={p[1]}
      />
      {key === "services" && (
        <section className="container section compact">
          <ServiceDirectory />
        </section>
      )}
      {key === "industries" && (
        <section className="container section compact">
          <div className="service-grid">
            {industries.map((i, n) => (
              <Link
                className="service-card"
                key={i.slug}
                href={`/industries/${i.slug}`}
              >
                <span className="eyebrow">INDUSTRY / 0{n + 1}</span>
                <h2>{i.name}</h2>
                <p>{i.challenge}</p>
                <span className="text-link">
                  Explore your possibilities <ArrowUpRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
      {service && (
        <>
          <section className="container section compact detail-layout">
            <div>
              <SectionHeading
                eyebrow="A PURPOSEFUL INVESTMENT"
                title="What this can help you address"
              />
              <ul className="editorial-list">
                {service.problems.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <h2>What’s included</h2>
              <ul className="check-list">
                {service.included.map((x) => (
                  <li key={x}>
                    <Check size={18} />
                    {x}
                  </li>
                ))}
              </ul>
              <h2>From brief to deliverables</h2>
              <ol className="timeline">
                {service.process.map((x, i) => (
                  <li key={x}>
                    <span>0{i + 1}</span>
                    <p>{x}</p>
                  </li>
                ))}
              </ol>
              <h2>Who it’s for</h2>
              <p>{service.ideal}</p>
              <h2>Questions about {service.name.toLowerCase()}</h2>
              <div className="faq">
                <details>
                  <summary>
                    How is the scope agreed?<span>+</span>
                  </summary>
                  <p>
                    We confirm goals, deliverables, timelines, responsibilities
                    and approval points in writing before work begins.
                  </p>
                </details>
                <details>
                  <summary>
                    What does the starting price cover?<span>+</span>
                  </summary>
                  <p>
                    {service.price
                      ? `The indicative starting fee is ${money(service.price)} ${service.period}.`
                      : "This service requires a custom quote."}{" "}
                    Final pricing depends on scope. {service.excluded}
                  </p>
                </details>
                <details>
                  <summary>
                    Can this be part of a wider plan?<span>+</span>
                  </summary>
                  <p>
                    Yes. We can coordinate this service alongside relevant
                    specialists under an agreed growth plan. Coordination
                    capacity and implementation fees are confirmed separately.
                  </p>
                </details>
              </div>
            </div>
            <aside className="quote-panel">
              <span className="eyebrow">INDICATIVE STARTING POINT</span>
              <strong>
                {service.price
                  ? `From ${money(service.price)}`
                  : "Custom quote"}
              </strong>
              <p>{service.period}</p>
              <p>
                Provisional launch pricing. Final scope, fees and applicable
                taxes are confirmed in writing.
              </p>
              <Button href={`/contact?service=${service.slug}`}>
                Request a Quote
              </Button>
              <h3>What is excluded</h3>
              <p>{service.excluded}</p>
              <p className="small">
                No guaranteed coverage, leads, rankings, sales or growth
                outcomes.
              </p>
            </aside>
          </section>
          <section className="container section compact">
            <SectionHeading
              eyebrow="KEEP IT CONNECTED"
              title="Related capabilities"
            />
            <ServiceLinks
              slugs={services
                .filter(
                  (s) =>
                    s.category === service.category && s.slug !== service.slug,
                )
                .concat(services.filter((s) => s.slug !== service.slug))
                .slice(0, 3)
                .map((s) => s.slug)
                .filter((s, i, a) => a.indexOf(s) === i)}
            />
          </section>
          {brand.domain && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Service",
                  name: service.name,
                  description: service.summary,
                  provider: { "@type": "Organization", name: brand.name },
                  url: `${brand.domain}/services/${service.slug}`,
                }).replace(/</g, "\\u003c"),
              }}
            />
          )}
        </>
      )}
      {industry && (
        <>
          <section className="container section compact detail-layout">
            <div>
              <SectionHeading
                eyebrow="THE BUSINESS CONTEXT"
                title="Common growth challenges"
                text={industry.challenge}
              />
              <h2>An example strategy</h2>
              <p className="lead">{industry.strategy}</p>
              <p className="notice">
                Illustrative approach only, not a completed client project or a
                guarantee. We adapt the scope after discovery.
              </p>
              <h2>Ideal client profile</h2>
              <p>{industry.ideal}</p>
              <h2>A practical first conversation</h2>
              <p>
                Bring your current channels, priorities and an approximate
                working budget. Together we can identify the most useful first
                step and the people needed to deliver it.
              </p>
            </div>
            <aside className="quote-panel">
              <span className="eyebrow">YOUR NEXT CHAPTER</span>
              <h2>Start with your business.</h2>
              <p>
                We will discuss priorities before recommending a paid scope.
              </p>
              <Button
                href={`/contact?message=${encodeURIComponent(industry.name)}`}
              >
                Discuss Your Goals
              </Button>
            </aside>
          </section>
          <section className="container section compact">
            <SectionHeading
              eyebrow="RELEVANT CAPABILITIES"
              title="Services to consider"
            />
            <ServiceLinks slugs={industry.services} />
          </section>
        </>
      )}
      {key === "about" && (
        <>
          <section className="container section compact two-col">
            <SectionHeading
              eyebrow="WHO WE ARE"
              title="You Build the Business. We Organise the Growth."
            />
            <div>
              <p className="lead">
                {brand.name} is a service-led business growth and coordination
                agency. We help owners make sense of their next move, connect
                suitable expertise and keep work moving in one direction.
              </p>
              <p>
                Our model begins with your challenge. We agree a practical plan,
                source or coordinate specialists, manage execution and review
                progress. The agency fee covers the agreed strategy and
                coordination; external providers and implementation are quoted
                separately.
              </p>
              <p>
                We are developing a partner-powered network through relevant
                experience, scope fit and clear expectations. We do not claim a
                pre-existing roster of verified partners or a launched
                technology platform.
              </p>
            </div>
          </section>
          <section className="section light-tint">
            <div className="container two-col">
              <div>
                <span className="eyebrow">OUR MISSION</span>
                <h2>Make growth more accessible.</h2>
                <p>
                  To make professional business growth more accessible,
                  organised and measurable for businesses of every size.
                </p>
              </div>
              <div>
                <span className="eyebrow">OUR VISION</span>
                <h2>A more connected ecosystem.</h2>
                <p>
                  To build a trusted growth ecosystem where businesses can
                  discover, access and coordinate the services and opportunities
                  they need through one platform.
                </p>
                <p className="small">
                  A technology-enabled platform is a future ambition, not an
                  already launched product.
                </p>
              </div>
            </div>
          </section>
          <section className="section container">
            <SectionHeading
              eyebrow="OUR PRINCIPLES"
              title="The Way We Choose to Work."
            />
            <div className="principles">
              {[
                [
                  "Transparency",
                  "Clear scopes, visible costs and honest reporting.",
                ],
                [
                  "Accountability",
                  "Agreed responsibilities and documented follow-through.",
                ],
                [
                  "Collaboration",
                  "Specialists working toward a shared business brief.",
                ],
                [
                  "Innovation",
                  "Useful ideas evaluated against practical needs.",
                ],
                [
                  "Business-first thinking",
                  "Priorities before channels. Purpose before activity.",
                ],
                [
                  "Long-term relationships",
                  "A working relationship built on clarity and trust.",
                ],
              ].map(([t, d]) => (
                <article key={t}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
      {key === "how-we-work" && (
        <section className="container section compact">
          <div className="two-col">
            <div>
              <SectionHeading
                eyebrow="THE GROWTHOS METHOD"
                title="One Brief. A Connected Path Forward."
              />
              <p className="notice">
                GrowthOS is a provisional name for our process, not a registered
                or independently validated product.
              </p>
              <p>
                Start with an enquiry or assessment. We discuss your situation,
                identify a suitable scope and explain the costs before you
                approve work.
              </p>
              <h3>Budgets and approvals stay clear.</h3>
              <p>
                Agency fees, provider quotes and media expenditure are
                separated. Extra work requires written approval; a plan is never
                permission for unlimited spending.
              </p>
              <h3>Less coordination on your desk.</h3>
              <p>
                A primary point of contact connects specialists, milestones and
                feedback. Progress reporting covers activity and available
                results, including what needs to change.
              </p>
            </div>
            <ol className="timeline large">
              {steps.map(([t, d], i) => (
                <li key={t}>
                  <span>0{i + 1}</span>
                  <div>
                    <h2>{t}</h2>
                    <p>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      {key === "pricing" && (
        <section className="container section compact">
          <p className="notice">
            All prices are provisional launch rates in Indian rupees. Taxes
            apply as legally required. Final scope and fees are confirmed in
            writing. No results are guaranteed.
          </p>
          <div className="pricing-grid">
            {plans.slice(1, 4).map((p) => (
              <PricingCard key={p.id} plan={p} />
            ))}
          </div>
          <div className="two-col pricing-extras">
            {[plans[0], plans[4]].map((p) => (
              <PricingCard key={p.id} plan={p} />
            ))}
          </div>
          <SectionHeading
            eyebrow="COMPARE THE SCOPE"
            title="Support That Matches Your Needs."
          />
          <div
            className="table-scroll"
            role="region"
            aria-label="Plan comparison"
            tabIndex={0}
          >
            <table>
              <caption>Monthly strategy and coordination comparison</caption>
              <thead>
                <tr>
                  <th>Included capacity</th>
                  {plans.slice(1, 4).map((p) => (
                    <th key={p.id}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Coordination hours", "Up to 3", "Up to 8", "Up to 18"],
                  ["Planning calls", "Monthly", "Twice monthly", "Weekly"],
                  ["Provider quote requests", "Up to 2", "Up to 5", "Up to 8"],
                  ["Active campaigns", "Roadmap only", "1", "Up to 2"],
                  [
                    "Roadmap",
                    "Monthly action plan",
                    "Personalised roadmap",
                    "Ongoing strategic direction",
                  ],
                  [
                    "Reporting",
                    "Activity summary",
                    "Performance summary",
                    "Enhanced performance reporting",
                  ],
                  [
                    "Point of contact",
                    "Coordination contact",
                    "Coordination contact",
                    "Dedicated primary contact",
                  ],
                  [
                    "Specialist coordination",
                    "Quote requests",
                    "Selected partners",
                    "Multiple providers",
                  ],
                  [
                    "Enquiry tracking",
                    "Basic progress tracking",
                    "Setup where feasible",
                    "Enhanced reporting",
                  ],
                  ["Scheduling", "Standard", "Standard", "Priority"],
                  [
                    "Implementation / ad spend",
                    "Separate",
                    "Separate",
                    "Separate",
                  ],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th scope="row" key={i}>
                          {cell}
                        </th>
                      ) : (
                        <td key={i}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="section compact">
            <SectionHeading
              eyebrow="INDIVIDUAL SERVICES & PROJECTS"
              title="One Specific Need? Start There."
              text="‘From’ prices are indicative starting rates. Final quotes depend on scope."
            />
            <div className="rate-list">
              {projectRates.map(([n, p, unit]) => (
                <div key={n}>
                  <span>{n}</span>
                  <strong>
                    {n === "Business Growth Audit" ? "" : "From "}
                    {money(p)}
                    <small>{unit}</small>
                  </strong>
                </div>
              ))}
            </div>
          </div>
          <div className="two-col">
            <div>
              <h2>What your agency fee covers</h2>
              <p>
                The agreed strategy, coordination hours, provider quote requests
                and reporting in your selected scope. Provider fees cover the
                actual specialist work, licensing, materials or execution.
              </p>
            </div>
            <div>
              <h2>No surprises in the scope</h2>
              <p>
                Third-party costs, creative production and media spend are
                excluded unless a written quote includes them. Additional work
                needs approval. Unused capacity, cancellation and refund terms
                must be agreed before purchase.
              </p>
              <p>
                Recurring billing requires a separate explicit subscription
                agreement and a configured payment solution. Requesting a plan
                does not start billing.
              </p>
            </div>
          </div>
        </section>
      )}
      {key === "growth-plan-finder" && (
        <section className="container section compact narrow">
          <GrowthPlanFinder />
        </section>
      )}
      {key === "contact" && (
        <section className="container section compact contact-layout">
          <aside>
            <span className="eyebrow">
              A BETTER START BEGINS WITH A CONVERSATION
            </span>
            <h2>
              Your ambitions.
              <br />
              Our next brief.
            </h2>
            <p>
              Share your goals and we’ll explore a practical starting point. No
              guaranteed outcomes. No commitment until you approve a written
              scope.
            </p>
            {brand.email && (
              <p>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </p>
            )}
            {brand.phone && (
              <p>
                <a href={`tel:${brand.phone}`}>{brand.phone}</a>
              </p>
            )}
            {brand.location && <p>{brand.location}</p>}
            {safeUrl(brand.booking) && (
              <Button href={safeUrl(brand.booking)}>Book a Call</Button>
            )}
            {!brand.email && (
              <p className="notice">
                Direct contact details are awaiting owner configuration.
              </p>
            )}
            <p className="small">
              Online delivery requires a configured email provider. The form
              will clearly report when sending is unavailable.
            </p>
          </aside>
          <ContactForm
            plan={get("plan")}
            service={get("service")}
            assessment={get("assessment")}
          />
        </section>
      )}
      {key === "faqs" && (
        <section className="container section compact narrow">
          <FAQAccordion />
        </section>
      )}
      {(key === "privacy" || key === "terms") && (
        <section className="container section compact legal narrow">
          <p className="notice">
            DRAFT — owner and legal review required before commercial launch.{" "}
            {brand.name} is a temporary brand, not a confirmed legal entity or
            trademark-cleared name.
          </p>
          {(key === "privacy"
            ? [
                [
                  "Who is responsible",
                  "The owner must confirm the legal business identity, data controller and contact details before launch. This draft describes the intended enquiry workflow.",
                ],
                [
                  "Enquiry data collection",
                  "The form collects your name, business name, email, telephone number, category, service interest, budget, message and optional consultation date. An assessment is included only when you choose to send it.",
                ],
                [
                  "Purpose and lawful processing",
                  "Enquiry information is used to understand your request, communicate with you and prepare a possible scope. The consent checkbox authorises enquiry processing; it does not subscribe you to marketing. The owner must review applicable Indian data protection requirements.",
                ],
                [
                  "Service providers and transfers",
                  "When configured, Resend processes enquiry email. The hosting provider processes technical requests, and a shared rate-limiting provider may process a network identifier. Review provider contracts and cross-border handling before launch.",
                ],
                [
                  "Retention and security",
                  "The owner must define and publish a retention period and deletion process. Use restricted inbox access, appropriate security controls and retain enquiries only as needed. No public database of enquiries is created by this site.",
                ],
                [
                  "Your choices",
                  "You may request access, correction or deletion using the real business contact once configured. The owner must define a response procedure and any legally required grievance mechanism.",
                ],
                [
                  "Cookies and analytics",
                  "No nonessential analytics or advertising tracking is enabled by this implementation. Any future analytics, cookies or marketing tools require a policy update and consent where legally required.",
                ],
                [
                  "Contact and updates",
                  "The owner must supply a privacy contact and confirm this policy before accepting commercial enquiries.",
                ],
              ]
            : [
                [
                  "Service scope",
                  "An enquiry or assessment does not create a contract. Deliverables, responsibilities, timelines, taxes and prices must be agreed in writing before paid work begins.",
                ],
                [
                  "Third-party providers",
                  "Specialist implementation, venue costs, creator fees and other provider services are separate unless included in the written scope. Responsibilities and contracting parties must be identified before approval.",
                ],
                [
                  "Advertising expenditure and approvals",
                  "Media spend is separate from agency fees. Campaign budgets, extra work and supplier commitments require written approval. No unlimited spending authority is implied.",
                ],
                [
                  "Payments and recurring billing",
                  "Payment timing and milestones are defined in an approved quote. Official hosted Razorpay links may be configured for fixed packages. Clicking a link does not establish payment, order acceptance or fulfilment. Recurring billing requires separate explicit consent.",
                ],
                [
                  "Refunds and cancellation — owner review required",
                  "The owner must define cancellation notice, deposits, completed-work charges, supplier commitments and any legally required refunds before accepting payment. No final refund policy has been established by this draft.",
                ],
                [
                  "Intellectual property and deliverables",
                  "Ownership, licences, source files, permitted usage and transfer conditions must be specified in the project agreement. Third-party assets retain their respective licensing terms.",
                ],
                [
                  "Outcomes and liability",
                  "No growth, revenue, lead volume, coverage or ranking is guaranteed. The owner must obtain legal review of any liability limitations, exclusions and remedies; statutory rights cannot be waived by this draft.",
                ],
                [
                  "Business identity, disputes and contact",
                  "The legal entity, official contact, governing law and dispute process must be confirmed before commercial launch. No registration, GST number or address is claimed.",
                ],
              ]
          ).map(([t, d]) => (
            <section key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </section>
          ))}
          {brand.email && (
            <p>
              Contact: <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
          )}
        </section>
      )}
      {!["privacy", "terms", "contact", "growth-plan-finder"].includes(key) && (
        <CTASection />
      )}
    </>
  );
}
