import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Aryamaan Roy Choudhury",
  description:
    "Building data-driven systems at the intersection of engineering, analytics, and sports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.variable} font-sans bg-navy text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
