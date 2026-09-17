import type { Metadata } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import { META } from "@/content/copy";
import { Analytics } from "@/components/Analytics";
import { RevealRoot } from "@/components/RevealRoot";
import { TurfFilterDefs } from "@/components/Turf";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: true,
});

const text = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-text",
  adjustFontFallback: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arena.ng";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: META.title,
  description: META.description,
  openGraph: {
    title: META.title,
    description: META.description,
    type: "website",
    locale: "en_NG",
    siteName: "Arena",
  },
  twitter: { card: "summary_large_image", title: META.title, description: META.description },
  alternates: { canonical: "/" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Arena",
      url: SITE_URL,
      areaServed: "Lagos, Nigeria",
    },
    {
      "@type": "WebSite",
      name: "Arena",
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?area={query}`,
        "query-input": "required name=query",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${display.variable} ${text.variable}`}>
      <body>
        <TurfFilterDefs />
        {children}
        <RevealRoot />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
