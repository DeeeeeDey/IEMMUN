import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveMeshBackground from "@/components/InteractiveMeshBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "IEMMUN 2026 | International Model United Nations Summit",
  description:
    "Official website of IEMMUN 2026. Join the world's premier academic simulation of the United Nations, engaging in elite diplomatic debate, global security resolutions, and crisis de-escalation.",
  keywords: [
    "IEMMUN",
    "Model United Nations",
    "MUN 2026",
    "International Conference",
    "Diplomacy",
    "Security Council",
    "World Economic Forum",
    "Academic Debate"
  ],
  authors: [{ name: "IEMMUN Secretariat" }],
  openGraph: {
    title: "IEMMUN 2026 | International Model United Nations Summit",
    description:
      "Join elite delegates from around the globe at IEMMUN 2026, resolving critical international crises and steering historical timelines.",
    url: "https://iemmun.org",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorantGaramond.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-accent selection:text-white font-sans isolate">
        <InteractiveMeshBackground />
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
