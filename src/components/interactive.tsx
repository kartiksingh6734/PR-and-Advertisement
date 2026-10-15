"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  Compass,
  Megaphone,
  Palette,
  Globe,
  Handshake,
  CalendarRange,
  ArrowRight,
  Target,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { categories, coreServices, services } from "@/lib/content";
import { money } from "@/lib/config";
const icons = [
  Megaphone,
  Target,
  Palette,
  Globe,
  Handshake,
  CalendarRange,
  ArrowRight,
  Compass,
];
export function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
export function CoreServices() {
  return (
    <div className="core-grid">
      {coreServices.map(([name, desc, slug], i) => {
        const Icon = icons[i];
        return (
          <Link href={`/services/${slug}`} className="core-card" key={slug}>
            <div className="card-top">
              <Icon size={24} strokeWidth={1.35} />
              <span>0{i + 1}</span>
            </div>
            <h3>{name}</h3>
            <p>{desc}</p>
            <span className="text-link">
              Explore service <ArrowUpRight size={15} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
export function ServiceDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const result = services.filter(
    (s) =>
      (category === "All" || s.category === category) &&
      `${s.name} ${s.summary}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="directory-tools">
        <label className="search">
          <Search size={19} />
          <input
            aria-label="Search services"
            placeholder="What does your business need?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="filters">
          {categories.map((c) => (
            <button
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="small" aria-live="polite">
        {result.length} services
      </p>
      <div className="service-grid">
        {result.map((s) => (
          <article className="service-card" key={s.slug}>
            <span className="eyebrow">{s.category}</span>
            <h2>{s.name}</h2>
            <p>{s.summary}</p>
            <div className="starting">
              {s.price ? `From ${money(s.price)} ${s.period}` : "Custom quote"}
            </div>
            <div className="card-links">
              <Link href={`/services/${s.slug}`}>View details ↗</Link>
              <Link href={`/contact?service=${s.slug}`}>Request quote</Link>
            </div>
          </article>
        ))}
      </div>
      {!result.length && (
        <p>No services match. Try another search or select All.</p>
      )}
    </>
  );
}
