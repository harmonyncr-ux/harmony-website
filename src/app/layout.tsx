import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Harmony HR Club | GLIM Gurgaon",
    template: "%s | Harmony HR Club GLIM Gurgaon",
  },
  description:
    "Great Lakes Institute of Management Gurgaon's HR Club — Practice real-world HR judgment, case dilemmas, interview prep, and alumni connect.",
  keywords: ["GLIM Gurgaon", "HR Club", "Harmony", "MBA HR", "HR Cases", "Interview Prep", "Great Lakes Gurgaon"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-[#f8fafc] text-slate-900 antialiased selection:bg-[#5850ec]/20 selection:text-[#5850ec]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
