import type { Metadata } from "next";
import { Outfit, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Qllix | Next-Gen Creative, Web & Growth Agency",
  description: "Designing the future of your brand. We specialize in visually stunning graphic design, high-performing Next.js web development, and hyper-scalable growth marketing.",
  keywords: ["Digital Agency", "Brand Design", "Web Design", "Digital Marketing", "Next.js Development", "UI/UX Design", "Performance Ads", "Creative Studio"],
  openGraph: {
    title: "Qllix | Next-Gen Creative, Web & Growth Agency",
    description: "Designing the future of your brand with world-class graphic design, high-performing web platforms, and data-driven growth marketing.",
    type: "website",
    url: "https://qllix-agency.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-[#00C853]/25 selection:text-[#007030] font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
