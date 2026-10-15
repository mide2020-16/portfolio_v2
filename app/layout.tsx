import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppShell } from "@/components/AppShell";
import { seo, personalInfo } from "@/lib/data/portfolio";
import { HireMeProvider } from "@/components/hire/HireMeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  metadataBase: new URL(seo.siteUrl),

  openGraph: {
    type: "website",
    url: seo.siteUrl,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} — Portfolio`,
      },
    ],
    siteName: `${personalInfo.name} | Portfolio`,
    locale: "en_NG",
  },

  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
    creator: "@westfiree",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: seo.siteUrl,
  },

  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  alternateName: personalInfo.shortName,
  jobTitle: personalInfo.title,
  description: seo.description,
  url: seo.siteUrl,
  email: personalInfo.email,
  sameAs: [
    "https://github.com/mide2020-16",
    "https://linkedin.com/in/efuwapeayomide",
    "https://x.com/westfiree",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Development",
    "Data Analysis",
    "Python",
  ],
  alumniOf: {
    "@type": "University",
    name: "Federal University of Agriculture, Abeokuta",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${dmSans.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full transition-colors duration-300">
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <HireMeProvider>
            <AppShell>
              {children}
            </AppShell>
          </HireMeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
