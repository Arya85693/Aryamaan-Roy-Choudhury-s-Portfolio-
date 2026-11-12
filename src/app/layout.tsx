import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandMenu from "@/components/CommandMenu";
import { DEFAULT_THEME, themeColors, themeInitScript } from "@/lib/theme";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aryamaan Roy Choudhury — Software, Data & Sports Analytics",
    template: "%s · Aryamaan Roy Choudhury",
  },
  description:
    "Computer Engineering & Computer Science student at Northeastern University building machine-learning models, data pipelines, and full-stack products — including Matchup DNA, a tennis forecasting and quantitative research platform, and Hoops Stock Market, a live NBA player market.",
  openGraph: {
    title: "Aryamaan Roy Choudhury — Software, Data & Sports Analytics",
    description:
      "Data pipelines, pricing systems, and full-stack products. Computer Engineering & CS at Northeastern University.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  // The page opens in the default theme; ThemeToggle re-syncs this when the visitor switches.
  themeColor: themeColors[DEFAULT_THEME],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${serif.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-accent px-4 py-2 text-sm font-medium text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Navbar />
        <CommandMenu />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
