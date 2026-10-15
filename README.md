# Elevora Growth

A Next.js App Router / TypeScript website for a service-led business growth agency. The name, pricing and GrowthOS process name are provisional. No testimonials, business metrics or completed client projects are claimed.

## Development

Requires Node.js 22+ and npm. Run commands from the repository root:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open the local development server in your own development environment. To validate:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
# With the production server running:
npx playwright install chromium
npm run test:e2e
```

If the machine's default npm cache is unwritable, use `npm ci --cache /workspace/.npm-cache`. Browser installation may require OS libraries. Production browser tests expect unconfigured email delivery and no credentials; use an isolated test environment. Tests do not send live email. Production build generates Next's route types; run build before typecheck in a completely clean checkout if needed.

## Editable content

- `src/lib/config.ts`: brand name, tagline, public contact bindings, navigation, all package prices, descriptions, feature limits, exclusions, payment links and individual project rates.
- `src/lib/content.ts`: services, industry profiles, process and FAQs. Service prices are derived from the central configuration.
- `src/lib/assessment.ts`: assessment questions and deterministic recommendation rules.
- `src/app/[...slug]/page.tsx`: editorial page content and initial legal drafts.
- `src/app/globals.css`: palette, layout, typography and breakpoints. Fonts are locally bundled through Fontsource; the custom SVG illustration is included in this repository.

The website includes home, about, service directory and 12 service details, industry directory and six industry details, process, pricing, finder, contact, FAQs, privacy and terms. Services can be searched and filtered. The finder transfers its answers to the enquiry. Pricing links prefill the selected plan. No payment is initiated by an enquiry.

## Contact and email configuration

Set public company email, phone, WhatsApp (international digits), office location, social HTTPS URLs and booking HTTPS URL in environment settings using `.env.example` as a guide. Leave unknown details empty. WhatsApp appears only with a plausible 10–15 digit number. Without a booking link, Book a Call opens the enquiry page.

For Resend, configure server-only `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (a verified sender), and `ENQUIRY_TO_EMAIL` (recipient). Set `NEXT_PUBLIC_COMPANY_EMAIL` for a direct-email fallback. The server validates the enquiry, consent and honeypot; requires same-origin JSON; caps body length; limits submissions; sends plain-text email without logging enquiry data. A provider acceptance response is reported as accepted for delivery, not confirmed inbox receipt. Missing or failing integrations return an explicit error and never claim delivery.

Local development uses a process-local five-requests-per-ten-minutes limiter. For Vercel production, set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for a shared, atomic limiter. Production fails closed if this protection is absent or unavailable. On Vercel, the limiter uses the platform-controlled `x-vercel-forwarded-for` header. For other hosts, adapt IP extraction to a trusted platform header before launch; arbitrary client headers are not trustworthy. The shared limiter stores a short-lived network identifier, disclosed in the draft privacy notice. Set appropriate provider retention/access controls. No application database stores enquiries; email retention must be defined by the owner.

## Payments

Set each plan's `paymentLink` in `src/lib/config.ts` to its correct official hosted Razorpay link. Only HTTPS `rzp.io` and `pages.razorpay.com` links are accepted. Empty/invalid links show Request This Plan and prefill the contact form. Verify each destination and exact package scope before publishing. No payment API keys belong in the browser. This site does not implement payment confirmation, webhooks, fulfilment or automatic subscriptions. Set those up separately if needed. Recurring billing always requires explicit subscription consent and a separate agreement.

## SEO and deployment

Import the repository into Vercel, choose Next.js, and set environment variables. Build: `npm run build`; use the repository root. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS domain, without a trailing slash. It controls metadata base, canonicals, sitemap, organisation and service structured data. With no domain the sitemap is intentionally empty and no fictional organisation URL is emitted. Review page titles and descriptions in page modules. Public environment variable changes require a rebuild.

Run the production checks before release and verify a real email using your own address after configuring integrations. Live provider acceptance, actual payment destinations and production-host behavior require owner validation; automated checks use no live credentials. No nonessential analytics or tracking is installed. Security headers cover MIME sniffing, framing and referrer policy; review host-specific CSP and operational policies before launch.

## Before commercial launch

- Confirm the legal entity and trademark clearance, or replace the provisional brand.
- Supply real email, phone, location (if desired), socials, booking URL and production domain.
- Configure Resend verified sender/recipient and production shared rate limiting.
- Review every provisional rate, scope, excluded cost, tax and payment term.
- Configure and independently verify official payment links if selling fixed packages.
- Obtain legal review of privacy, retention, cancellation/refunds, IP, liability and dispute terms. Draft pages explicitly require this review.
- Verify real email delivery, accessibility and responsive behavior on target devices. No Lighthouse score is claimed without a measured run.

Each cloud task already has an isolated checkout. Use the existing repository; do not create a worktree unless explicitly requested. Dependencies survive snapshots; server processes must be restarted with `npm run dev` or `npm start` after a build.
