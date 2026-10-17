import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { AppShell } from "@/components/AppShell";
import { HireMeProvider } from "@/components/hire/HireMeProvider";
import { seo, personalInfo } from "@/lib/data/portfolio";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),

  title: {
    default: seo.title,
    template: `%s | ${personalInfo.shortName}`,
  },

  description: seo.description,

  keywords: seo.keywords,

  authors: [
    {
      name: personalInfo.name,
      url: seo.siteUrl,
    },
  ],

  creator: personalInfo.name,
  publisher: personalInfo.name,

  applicationName: `${personalInfo.name} Portfolio`,

  category: "technology",

  alternates: {
    canonical: "/",
  },

  verification: {
    google:
      "SREPRDvh_kseUaS8giDwYMK5_vPcG6F30vbgtyeEiVk",
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: `${personalInfo.name} | Portfolio`,
    title: seo.title,
    description: seo.description,

    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} — ${personalInfo.title}`,
      },
    ],
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
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",

  "@id": `${seo.siteUrl}/#person`,

  name: personalInfo.name,

  alternateName: [
    "Ayomide Oreoluwa",
    "Ayomide Efuwape",
  ],

  url: seo.siteUrl,

  image: `${seo.siteUrl}/og-image.png`,

  jobTitle: personalInfo.title,

  description: seo.description,

  email: `mailto:${personalInfo.email}`,

  nationality: {
    "@type": "Country",
    name: "Nigeria",
  },

  sameAs: personalInfo.socials.map(
    (social) => social.url,
  ),

  knowsAbout: [
    "Software Engineering",
    "Frontend Development",
    "Full-Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Data Analysis",
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
  ],

  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Federal University of Agriculture, Abeokuta",
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
          <HireMeProvider>
            <AppShell>
              {children}
            </AppShell>
          </HireMeProvider>
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  );
}