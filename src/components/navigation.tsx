"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { brand, navigation, safeUrl } from "@/lib/config";
import { services } from "@/lib/content";
import { Wordmark } from "./ui";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 20);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open]);
  return (
    <header className={`header ${solid ? "solid" : ""}`}>
      <nav className="container nav" aria-label="Main navigation">
        <Link
          href="/"
          aria-label={`${brand.name} home`}
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </Link>
        <div className="desktop-nav">
          {navigation.map(([label, href]) =>
            label === "Services" ? (
              <details className="nav-dropdown" key={href}>
                <summary>
                  Services <span>⌄</span>
                </summary>
                <div>
                  {services.map((s) => (
                    <Link
                      onClick={(e) =>
                        e.currentTarget
                          .closest("details")
                          ?.removeAttribute("open")
                      }
                      href={`/services/${s.slug}`}
                      key={s.slug}
                    >
                      {s.name}
                    </Link>
                  ))}
                  <Link href="/services">Explore all services →</Link>
                </div>
              </details>
            ) : (
              <Link key={href} href={href}>
                {label}
              </Link>
            ),
          )}
        </div>
        <Link className="nav-cta" href="/growth-plan-finder">
          Get a Growth Plan <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <div id="mobile-menu" className="mobile-menu">
            {[...navigation, ["Growth Plan Finder", "/growth-plan-finder"]].map(
              ([label, href]) => (
                <Link href={href} key={href} onClick={() => setOpen(false)}>
                  {label}
                  <ArrowUpRight size={18} />
                </Link>
              ),
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
export function Footer() {
  const wa = brand.whatsapp.replace(/\D/g, "");
  return (
    <>
      <footer>
        <div className="container footer-grid">
          <div>
            <Link href="/">
              <Wordmark />
            </Link>
            <p>{brand.description}</p>
            <span className="eyebrow">{brand.tagline}</span>
          </div>
          <div>
            <h3>Explore</h3>
            {[...navigation, ["FAQs", "/faqs"]].map(([l, h]) => (
              <Link key={h} href={h}>
                {l}
              </Link>
            ))}
          </div>
          <div>
            <h3>Make your next move</h3>
            <Link href="/growth-plan-finder">Find your growth plan ↗</Link>
            <Link href={safeUrl(brand.booking) || "/contact"}>
              Book a Call ↗
            </Link>
            {brand.email && <a href={`mailto:${brand.email}`}>{brand.email}</a>}
            {brand.phone && <a href={`tel:${brand.phone}`}>{brand.phone}</a>}
            {brand.location && <p>{brand.location}</p>}
            {[
              ["Instagram", brand.instagram],
              ["LinkedIn", brand.linkedin],
            ]
              .filter(([, u]) => safeUrl(u))
              .map(([n, u]) => (
                <a href={safeUrl(u)} key={n} rel="noopener noreferrer">
                  {n} ↗
                </a>
              ))}
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
          <div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
      {/^\d{10,15}$/.test(wa) && (
        <a
          className="whatsapp"
          href={`https://wa.me/${wa}`}
          aria-label="Contact on WhatsApp"
        >
          WhatsApp ↗
        </a>
      )}
    </>
  );
}
