import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Check } from "lucide-react";
import {
  Button,
  SectionHeading,
  CTASection,
  FAQAccordion,
  PricingCard,
} from "@/components/ui";
import { CoreServices, Reveal } from "@/components/interactive";
import { industries } from "@/lib/content";
import { brand, plans } from "@/lib/config";
export const metadata: Metadata = {
  title: "Your all-in-one business growth partner",
  description: brand.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `Your business. Our growth mission. | ${brand.name}`,
    description: brand.description,
    url: "/",
  },
};
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="status-dot" /> YOUR ALL-IN-ONE BUSINESS GROWTH
            PARTNER
          </span>
          <h1>
            Your Business
            <br />
            Deserves More
            <br />
            Than Just
            <br />
            <em>Marketing.</em>
          </h1>
          <p>
            We bring strategy, PR, advertising, creative services, technology
            and business opportunities together under one growth partner — so
            you can focus on running your business.
          </p>
          <div className="button-row">
            <Button href="/growth-plan-finder">Get Your Growth Plan</Button>
            <Link className="quiet-link" href="/services">
              Explore Our Services <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-assurance">
            <span>
              <Check size={14} /> Business-first strategy
            </span>
            <span>
              <Check size={14} /> One point of contact
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-caption">
            <span>THE BIGGER PICTURE</span>
            <span>STRATEGY → EXECUTION</span>
          </div>
          <Image
            src="/growth-architecture.svg"
            alt="Three ascending architectural blocks connected by a growth pathway, representing coordinated business progress"
            width={680}
            height={680}
            priority
          />
          <div className="art-card">
            <span className="small">LESS COMPLEXITY. MORE DIRECTION.</span>
            <strong>
              Built around
              <br />
              your next chapter.
            </strong>
            <span className="art-arrow">
              <ArrowUpRight size={28} />
            </span>
          </div>
          <div className="art-foot">
            STRATEGY. SPECIALISTS. OPPORTUNITY.<span>ALL CONNECTED.</span>
          </div>
        </div>
      </section>
      <div className="mission-strip">
        <div className="container">
          <span>You Build the Business.</span>
          <strong>We Organise the Growth.</strong>
          <Link href="/how-we-work">
            Discover our approach <ArrowDown size={16} />
          </Link>
        </div>
      </div>
      <section className="section container problem">
        <Reveal>
          <SectionHeading
            eyebrow="01 / THE CHALLENGE"
            title="Growing a Business Shouldn’t Mean Managing Ten Different Agencies."
          />
        </Reveal>
        <div>
          <p className="lead">
            Your time belongs in your business. Not in chasing freelancers,
            comparing providers and connecting the dots yourself.
          </p>
          <div className="problem-list">
            {[
              "Finding reliable service providers",
              "Managing different freelancers",
              "Wasting advertising budgets",
              "Inconsistent branding",
              "Lack of business connections",
              "Difficulty measuring results",
              "Not knowing where to invest first",
            ].map((p, i) => (
              <span key={p}>
                <small>0{i + 1}</small>
                {p}
              </span>
            ))}
          </div>
          <p className="statement">
            One partner. One coordinated strategy.
            <br />
            <strong>Every service working toward your goals.</strong>
          </p>
        </div>
      </section>
      <section className="section services-section">
        <div className="container">
          <div className="heading-row">
            <SectionHeading
              eyebrow="02 / CONNECTED CAPABILITIES"
              title="Everything You Need to Move Your Business Forward."
            />
            <Link className="text-link" href="/services">
              All services <ArrowUpRight size={17} />
            </Link>
          </div>
          <CoreServices />
        </div>
      </section>
      <section className="section container difference">
        <div className="difference-art">
          <span className="eyebrow">YOUR BUSINESS, AT THE CENTRE</span>
          <div className="orbit">
            <span>Strategy</span>
            <span>Specialists</span>
            <strong>
              One shared
              <br />
              direction.
            </strong>
            <span>Execution</span>
            <span>Progress</span>
          </div>
          <p>
            Good work becomes more useful
            <br />
            when it works together.
          </p>
        </div>
        <div>
          <SectionHeading
            eyebrow="03 / A DIFFERENT KIND OF PARTNER"
            title="Not Another Agency. Your Growth Partner."
            text="We look at the whole business, then bring the right capabilities together around an agreed plan."
          />
          <ol className="benefit-list">
            {[
              "One point of contact",
              "Personalised growth strategy",
              "Access to trusted specialists",
              "Transparent pricing",
              "Coordinated execution",
              "Measurable progress",
            ].map((x, i) => (
              <li key={x}>
                <span>0{i + 1}</span>
                {x}
                <ArrowUpRight size={17} />
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section process-dark">
        <div className="container">
          <div className="heading-row">
            <SectionHeading
              eyebrow="04 / CLARITY AT EVERY STEP"
              title="From Business Challenge to Growth Plan."
            />
            <Button href="/how-we-work" secondary>
              Our method
            </Button>
          </div>
          <div className="five-steps">
            {[
              [
                "Discover",
                "We listen to your business, goals and constraints.",
              ],
              ["Strategise", "We turn priorities into an achievable roadmap."],
              ["Assemble", "We coordinate suitable people and providers."],
              ["Execute", "We connect timelines, budgets and approvals."],
              [
                "Measure & Improve",
                "We review progress and refine what comes next.",
              ],
            ].map(([t, d], i) => (
              <div key={t}>
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="heading-row">
          <SectionHeading
            eyebrow="05 / MADE FOR YOUR WORLD"
            title="Built for Businesses at Every Stage."
          />
          <Link href="/industries" className="text-link">
            Explore industries <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="industry-grid">
          {industries.map((x, i) => (
            <Link href={`/industries/${x.slug}`} key={x.slug}>
              <span className="index">0{i + 1}</span>
              <h3>{x.name}</h3>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section pricing-section">
        <div className="container">
          <SectionHeading
            eyebrow="06 / A CLEAR STARTING POINT"
            title="The Right Support. A Clearly Defined Scope."
            text="Provisional launch pricing for India. Strategy and coordination fees, with implementation costs agreed separately."
          />
          <div className="pricing-grid">
            {plans.slice(1, 4).map((p) => (
              <PricingCard key={p.id} plan={p} />
            ))}
          </div>
          <div className="center">
            <Link className="text-link" href="/pricing">
              Compare plans & explore individual services{" "}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container finder-banner">
        <div>
          <span className="eyebrow">A LITTLE CLARITY GOES A LONG WAY</span>
          <h2>
            Not Sure What Your
            <br />
            Business Needs?
          </h2>
          <p>
            Tell us about your business, and we’ll help you identify the right
            starting point.
          </p>
        </div>
        <Button href="/growth-plan-finder">Find My Growth Plan</Button>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="07 / POSSIBILITIES, IN PRACTICE"
          title="Different Businesses. Thoughtful Starting Points."
          text="Illustrative growth scenarios — these are examples of possible approaches, not completed client projects."
        />
        <div className="scenario-grid">
          {[
            [
              "01",
              "A restaurant seeking more local customers",
              "Local discovery, thoughtful content and a focused neighbourhood campaign.",
              "restaurants-cafes",
            ],
            [
              "02",
              "A clothing brand preparing for launch",
              "A coherent identity, creator coordination and a connected launch calendar.",
              "retail-boutiques",
            ],
            [
              "03",
              "A manufacturer looking for B2B buyers",
              "Clear capability messaging, buyer research and structured outreach.",
              "manufacturing-b2b",
            ],
          ].map(([n, t, d, s]) => (
            <Link key={n} href={`/industries/${s}`}>
              <span className="eyebrow">EXAMPLE SCENARIO / {n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section container faq-section">
        <SectionHeading
          eyebrow="08 / GOOD QUESTIONS"
          title="A Little More Clarity."
        />
        <div>
          <FAQAccordion limit={5} />
          <Link href="/faqs" className="text-link">
            All frequently asked questions <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <CTASection />
    </>
  );
}
