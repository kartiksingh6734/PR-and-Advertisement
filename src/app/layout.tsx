import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/navigation";
import { brand } from "@/lib/config";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: brand.name, template: `%s | ${brand.name}` },
  description: brand.description,
  metadataBase: brand.domain ? new URL(brand.domain) : undefined,
  openGraph: { siteName: brand.name, type: "website" },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        {brand.domain && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: brand.name,
                url: brand.domain,
                description: brand.description,
                ...(brand.email ? { email: brand.email } : {}),
              }).replace(/</g, "\\u003c"),
            }}
          />
        )}
      </body>
    </html>
  );
}
