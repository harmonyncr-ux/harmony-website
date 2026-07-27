"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/lib/authContext";
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
  Lock,
  LogOut,
  UserCheck
} from "lucide-react";

const navLinks = [
  { href: "/vault", label: "The Vault", icon: ShieldAlert },
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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, setLoginModalOpen, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-[#f8fafc]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[#f8fafc]/80 py-2.5 px-2 sm:px-4 lg:px-6 transition-all duration-300">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-3 sm:px-5 py-2 rounded-2xl lg:rounded-full border border-white/90 bg-white/95 shadow-md shadow-slate-900/[0.03] ring-1 ring-slate-900/[0.04] overflow-visible">

        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2 shrink-0 transition-transform active:scale-95 mr-1 lg:mr-3">
          <Image 
            src="/clg.png" 
            alt="Great Lakes Gurgaon Logo" 
            width={130}
            height={36}
            priority
            className="h-7 sm:h-9 w-auto object-contain brightness-0 hover:opacity-85 transition-opacity" 
          />
          <span className="text-slate-300 font-light text-base select-none">|</span>
          <Image 
            src="/GL GGN_harmony.png" 
            alt="Harmony HR Club Logo" 
            width={145}
            height={36}
            priority
            className="h-7 sm:h-9 w-auto object-contain brightness-0 hover:opacity-85 transition-opacity" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1 shrink">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1 rounded-full px-2 py-1.5 text-[11px] xl:text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-[#5850ec] text-white shadow-md shadow-[#5850ec]/20"
                    : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span className="whitespace-nowrap">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Auth Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto lg:ml-2">
          
          {/* User Auth Control */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100/80 transition-all"
              >
                <UserCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span className="max-w-[90px] truncate hidden sm:inline">{user.name}</span>
                <span className="rounded-full bg-emerald-600 text-white px-1.5 py-0.2 text-[9px] font-mono uppercase">
                  Verified
                </span>
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 space-y-2 text-left">
                  <div className="border-b border-slate-100 pb-2 px-1">
                    <span className="text-xs font-bold text-slate-900 block truncate">{user.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 block truncate">{user.email}</span>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                      Great Lakes Gurgaon Authorized
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setUserDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl p-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="inline-flex items-center gap-1 rounded-full border border-[#5850ec]/30 bg-[#EEF2FF] px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold text-[#5850ec] hover:bg-[#5850ec] hover:text-white transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              <GraduationCap className="h-3.5 w-3.5 shrink-0" />
              <span>College Sign In</span>
            </button>
          )}

          {/* Today's Dilemma Pill */}
          <Link
            href="/vault"
            className="group relative inline-flex items-center gap-1 sm:gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#5850ec] to-[#7C3AED] px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold text-white shadow-md shadow-[#5850ec]/25 transition-all hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-200 animate-pulse shrink-0 relative z-10" />
            <span className="whitespace-nowrap relative z-10 hidden sm:inline">Today&apos;s Dilemma</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-2 mx-1 overflow-hidden rounded-3xl border border-white/50 bg-white/90 backdrop-blur-2xl shadow-2xl ring-1 ring-slate-900/5 xl:hidden"
          >
            <div className="grid gap-1 px-4 pb-5 pt-4 sm:grid-cols-2">
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
