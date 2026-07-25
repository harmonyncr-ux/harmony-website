"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronRight,
  ShieldAlert,
  GraduationCap,
  BookOpen,
  Mail,
  Calendar,
  Trophy,
  Newspaper,
  FileText,
  Users,
  Lock
} from "lucide-react";

const navLinks = [
  { href: "/vault", label: "The Vault", icon: ShieldAlert, badge: "Daily" },
  { href: "/interview-prep", label: "Prep Guide", icon: BookOpen },
  { href: "/alumni", label: "Alumni", icon: GraduationCap },
  { href: "/hr-news", label: "HR News", icon: Newspaper },
  { href: "/case-comps", label: "Case Comps", icon: Trophy },
  { href: "/cv-resources", label: "CV Vault", icon: FileText },
  { href: "/newsletter", label: "Newsletter", icon: Mail },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/team", label: "Team", icon: Users },
  { href: "/admin", label: "Admin", icon: Lock },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 overflow-hidden">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo - Official Dual Logo (No Box) */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0 transition-transform active:scale-95 mr-2 lg:mr-4">
          <Image 
            src="/clg.png" 
            alt="Great Lakes Gurgaon Logo" 
            width={140}
            height={40}
            priority
            className="h-8 sm:h-10 w-auto object-contain brightness-0 hover:opacity-85 transition-opacity" 
          />
          <span className="text-slate-300 font-light text-lg select-none">|</span>
          <Image 
            src="/GL GGN_harmony.png" 
            alt="Harmony HR Club Logo" 
            width={160}
            height={40}
            priority
            className="h-8 sm:h-10 w-auto object-contain brightness-0 hover:opacity-85 transition-opacity" 
          />
        </Link>

        {/* Desktop Navigation - Clean Single Line */}
        <nav className="hidden items-center gap-0.5 xl:flex xl:gap-1 2xl:gap-1.5 shrink">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-[#5850ec] text-white shadow-md shadow-[#5850ec]/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span className="whitespace-nowrap">{link.label}</span>
                {link.badge && (
                  <span className="ml-0.5 rounded-full bg-red-500/10 px-1.5 py-0.2 text-[9px] font-bold text-red-500 border border-red-500/20 whitespace-nowrap">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button - Single Line Pill */}
        <div className="flex items-center gap-2.5 shrink-0 ml-2 lg:ml-4">
          <Link
            href="/vault"
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#5850ec] px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-lg shadow-[#5850ec]/30 transition-all hover:bg-[#4b44dc] hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-100 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">Today&apos;s Dilemma</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 xl:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-200 bg-white xl:hidden"
          >
            <div className="grid gap-1 px-4 pb-6 pt-4 sm:grid-cols-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl p-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#5850ec] text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span className="whitespace-nowrap">{link.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
