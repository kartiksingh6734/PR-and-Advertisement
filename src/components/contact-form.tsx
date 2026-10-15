"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { enquirySchema, type Enquiry } from "@/lib/enquiry";
import { brand } from "@/lib/config";
import { services, industries } from "@/lib/content";
export function ContactForm({
  plan = "",
  service = "",
  assessment = "",
}: {
  plan?: string;
  service?: string;
  assessment?: string;
}) {
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      business: "",
      email: "",
      phone: "",
      category: "",
      service: services.some((s) => s.slug === service) ? service : "",
      budget: "",
      message: "",
      date: "",
      consent: false,
      website: "",
      plan: plan.slice(0, 150),
      assessment: assessment.slice(0, 2500),
    },
  });
  async function submit(data: Enquiry) {
    setStatus(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setStatus({ ok: res.ok, text: result.message });
    } catch {
      setStatus({
        ok: false,
        text: "Unable to connect. Please try again later.",
      });
    }
  }
  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
      {plan && (
        <p className="notice">
          Enquiring about: <strong>{plan}</strong>. No payment or recurring
          billing is initiated.
        </p>
      )}
      {assessment && (
        <details className="assessment-summary">
          <summary>Your assessment</summary>
          <p className="preserve">{assessment}</p>
        </details>
      )}
      <div className="form-grid">
        {(["name", "business", "email", "phone"] as const).map((name, i) => (
          <label key={name} htmlFor={name}>
            {
              [
                "Full Name",
                "Business Name",
                "Email Address",
                "Phone / WhatsApp Number",
              ][i]
            }
            <input
              id={name}
              type={
                name === "email" ? "email" : name === "phone" ? "tel" : "text"
              }
              autoComplete={
                {
                  name: "name",
                  business: "organization",
                  email: "email",
                  phone: "tel",
                }[name]
              }
              {...register(name)}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
            {errors[name] && (
              <span className="error" id={`${name}-error`}>
                {errors[name]?.message}
              </span>
            )}
          </label>
        ))}
        <label>
          Business Category
          <select {...register("category")} aria-invalid={!!errors.category}>
            <option value="">Select category</option>
            {industries.map((i) => (
              <option key={i.slug}>{i.name}</option>
            ))}
            <option>Other</option>
          </select>
          {errors.category && (
            <span className="error">{errors.category.message}</span>
          )}
        </label>
        <label>
          Service Interested In
          <select {...register("service")} aria-invalid={!!errors.service}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option value={s.slug} key={s.slug}>
                {s.name}
              </option>
            ))}
            <option value="growth-plan">A growth plan / help deciding</option>
          </select>
          {errors.service && (
            <span className="error">{errors.service.message}</span>
          )}
        </label>
        <label>
          Estimated Budget
          <select {...register("budget")} aria-invalid={!!errors.budget}>
            <option value="">Select a budget</option>
            {[
              "Under ₹5,000",
              "₹5,000–₹15,000",
              "₹15,000–₹30,000",
              "Above ₹30,000",
              "Let’s discuss",
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          {errors.budget && (
            <span className="error">{errors.budget.message}</span>
          )}
        </label>
        <label>
          Preferred Consultation Date <span className="small">(optional)</span>
          <input
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("date")}
          />
          {errors.date && <span className="error">{errors.date.message}</span>}
        </label>
      </div>
      <label>
        Tell us about your business
        <textarea
          rows={5}
          {...register("message")}
          placeholder="What would you like to change, improve or launch?"
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span className="error">{errors.message.message}</span>
        )}
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" {...register("consent")} />
        <span>
          I agree to the processing of my enquiry as described in the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </span>
      </label>
      {errors.consent && (
        <p className="error" role="alert">
          {errors.consent.message}
        </p>
      )}
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending enquiry…" : "Send My Enquiry ↗"}
      </button>
      {status && (
        <div
          role={status.ok ? "status" : "alert"}
          className={status.ok ? "notice" : "error notice"}
        >
          {status.text}
          {!status.ok && brand.email && (
            <>
              {" "}
              Email directly:{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>.
            </>
          )}
        </div>
      )}
      <p className="small">
        Submitting an enquiry does not create a paid engagement. We agree scope
        and fees in writing first.
      </p>
    </form>
  );
}
