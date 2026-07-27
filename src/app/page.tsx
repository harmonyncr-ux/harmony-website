"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import HrDilemmaSimulator from "@/components/HrDilemmaSimulator";
import BentoSectionCard, { IconName } from "@/components/BentoSectionCard";
import MagicBento from "@/components/MagicBento/MagicBento";
import { UnderlineDoodle, ArrowDoodle } from "@/components/DoodleAccents";
import {
  AnimatedSection,
  AnimatedBadge,
  AnimatedHeading,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
} from "@/components/AnimatedSection";
import { 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Building2,
  TrendingUp,
  BookOpen,
  GraduationCap,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Users,
  Trophy,
  FileText,
  Briefcase,
  Star,
  Award,
  Zap,
  ArrowUpRight
} from "lucide-react";

interface BentoSection {
  title: string;
  description: string;
  href: string;
  iconName: IconName;
  category: string;
  number: string;
  badge?: string;
  size?: "normal" | "wide" | "tall";
}

const bentoSections: BentoSection[] = [
  {
    title: "Interview Prep Guide",
    description: "Round-by-round breakdown for HR rounds, case rounds, psychometric tests, and group discussions with benchmark sample answers.",
    href: "/interview-prep",
    iconName: "BookOpen",
    category: "Placement Flagship",
    number: "01",
    badge: "Most Popular",
    size: "wide",
  },
  {
    title: "Alumni Connect Network",
    description: "Direct contact directory of placed GLIM alumni across top HR firms, tech consultancies, and MNCs.",
    href: "/alumni",
    iconName: "GraduationCap",
    category: "Mentorship",
    number: "02",
    badge: "Verified",
    size: "normal",
  },
  {
    title: "HR News & Intelligence",
    description: "Curated daily HR, labor compliance, and corporate culture news parsed and summarized for quick student digest.",
    href: "/hr-news",
    iconName: "Newspaper",
    category: "Market Beat",
    number: "03",
    badge: "Auto-Updated",
    size: "normal",
  },
  {
    title: "MBA Case Comps Hub",
    description: "Curated national and campus HR case competitions, strategy guides, and past winning decks.",
    href: "/case-comps",
    iconName: "Trophy",
    category: "Competitions",
    number: "04",
    size: "normal",
  },
  {
    title: "CV Vault & Recruiter Guide",
    description: "HR-tailored resume templates, bullet point formulas, dos & don'ts, and recruiter ATS scanners.",
    href: "/cv-resources",
    iconName: "FileText",
    category: "Career Tools",
    number: "05",
    size: "normal",
  },
  {
    title: "Monthly Newsletter Archive",
    description: "Searchable PDF database of past monthly Harmony editions covering HR trends, student spotlights, and interviews.",
    href: "/newsletter",
    iconName: "Mail",
    category: "Archive",
    number: "06",
    size: "normal",
  },
  {
    title: "Events & Workshops",
    description: "Keynotes, guest speaker series, HR tech workshops, and mock interview marathons at GLIM Gurgaon.",
    href: "/events",
    iconName: "Calendar",
    category: "Campus Events",
    number: "07",
    size: "normal",
  },
  {
    title: "GLIM Campus Updates",
    description: "Official announcements, campus drives, and academic schedules relevant to HR specialization students.",
    href: "/college-updates",
    iconName: "Bell",
    category: "Announcements",
    number: "08",
    size: "normal",
  },
  {
    title: "Core Team & Mentors",
    description: "Meet the student executive board, committee heads, and faculty advisor powering Harmony HR Club.",
    href: "/team",
    iconName: "Users",
    category: "Leadership",
    number: "09",
    size: "normal",
  },
];

export default function HomePage() {
  const [heroOption, setHeroOption] = useState<string>("a");
  const [heroVoted, setHeroVoted] = useState<boolean>(false);

  return (
    <div className="space-y-20 pb-20 bg-[#f8fafc]">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION: Dynamic Split Grid + Interactive Case Widget
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f8fafc] pt-10 pb-20 text-slate-900">
        
        {/* Ambient Glowing Background Orbs & Dots */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 left-1/4 h-[650px] w-[950px] rounded-full bg-gradient-to-tr from-[#5850ec]/15 via-indigo-400/10 to-purple-500/15 blur-3xl" />
          <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-[#5850ec]/10 blur-3xl animate-float-delayed" />
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* LEFT COLUMN: High Impact Copy & CTAs */}
            <div className="lg:col-span-7 space-y-7 text-left">
              
              {/* Live Status Eyebrow Badge */}
              <AnimatedBadge delay={0.05}>
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#5850ec]/30 bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-md shadow-[#5850ec]/5">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#5850ec] animate-ping" />
                  <span className="text-[#5850ec] font-extrabold tracking-wider uppercase text-[11px]">GLIM Gurgaon HR Specialization</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-medium flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5 text-amber-500" />
                    Case #042 Live
                  </span>
                </div>
              </AnimatedBadge>

              {/* Main Headline */}
              <AnimatedHeading delay={0.15}>
                <h1 className="font-['Outfit'] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                  Where Future HR Leaders <br />
                  <span className="inline-block mt-1 bg-gradient-to-r from-[#5850ec] via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Master Corporate Judgment.
                  </span>
                </h1>
              </AnimatedHeading>

              {/* High Context Subtext */}
              <AnimatedSection delay={0.25}>
                <p className="text-base text-slate-600 sm:text-lg leading-relaxed font-normal max-w-xl">
                  Step into real boardroom scenarios. Practice daily HR dilemmas, access recruiter-vetted ATS resume formulas, and connect directly with placed GLIM alumni.
                </p>
              </AnimatedSection>

              {/* Feature Pills */}
              <AnimatedSection delay={0.35}>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {[
                    { label: "Daily Case Vault", icon: ShieldAlert, color: "text-[#5850ec] bg-[#EEF2FF]" },
                    { label: "Interview Prep Bank", icon: BookOpen, color: "text-blue-600 bg-blue-50" },
                    { label: "ATS Resume formulas", icon: FileText, color: "text-emerald-600 bg-emerald-50" },
                    { label: "50+ Alumni Network", icon: GraduationCap, color: "text-purple-600 bg-purple-50" },
                  ].map((feat) => (
                    <span
                      key={feat.label}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${feat.color} border border-slate-200/60`}
                    >
                      <feat.icon className="h-3.5 w-3.5" />
                      <span>{feat.label}</span>
                    </span>
                  ))}
                </div>
              </AnimatedSection>

              {/* Call to Action Buttons */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <Link
                  href="/vault"
                  className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#5850ec] to-[#4b44dc] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#5850ec]/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#5850ec]/40 active:scale-95 overflow-hidden"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <Sparkles className="h-4 w-4 text-indigo-100 relative z-10 animate-pulse" />
                  <span className="relative z-10">Practice Today&apos;s Dilemma</span>
                  <ArrowRight className="h-4 w-4 text-white relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/interview-prep"
                  className="flex items-center gap-2 rounded-full border border-slate-300 bg-white/90 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:border-[#5850ec]/40 hover:bg-slate-50 hover:shadow"
                >
                  <span>Interview Prep Bank</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
              </motion.div>

              {/* Student Proof & Rating Bar */}
              <AnimatedSection delay={0.55}>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80 max-w-lg">
                  {/* Avatar Stack */}
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5850ec] text-xs font-bold text-white ring-2 ring-white">AM</div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white ring-2 ring-white">DL</div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white ring-2 ring-white">AC</div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white ring-2 ring-white">AP</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-current" />
                      ))}
                      <span className="ml-1 text-xs font-bold text-slate-800">4.9/5 Rating</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500">
                      100+ Active GLIM HR MBA Students & Placed Alumni
                    </p>
                  </div>
                </div>
              </AnimatedSection>

            </div>

            {/* RIGHT COLUMN: Interactive Live Dilemma Teaser Card + Floating Glass Badges */}
            <div className="lg:col-span-5 relative">
              
              <AnimatedSection animation="scale-up" delay={0.35} duration={0.6}>
                
                {/* Main Glassmorphic Interactive Dilemma Widget */}
                <div className="relative rounded-3xl border border-white/80 bg-white/90 p-6 sm:p-7 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl ring-1 ring-slate-900/5 overflow-hidden">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#5850ec]">
                        <ShieldAlert className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#5850ec] uppercase tracking-wider block">Today&apos;s Executive Case</span>
                        <span className="text-xs font-bold text-slate-900">Performance vs Culture</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      Live Vote
                    </span>
                  </div>

                  {/* Dilemma Title & Scenario preview */}
                  <div className="space-y-2 text-left mb-5">
                    <h3 className="font-['Outfit'] text-base font-bold text-slate-900 leading-snug">
                      The Star Performer vs. Team Morale Dilemma
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      VP of Engineering demands immediate promotion for a top lead architect who hit 3 consecutive record quarters, despite 85% of her team reporting extreme demotivation. How do you intervene?
                    </p>
                  </div>

                  {/* Interactive Options Preview */}
                  <div className="space-y-2 text-left mb-5">
                    {[
                      { id: "a", label: "Option A: Conditional Promotion + Executive Coaching", votes: "52%" },
                      { id: "b", label: "Option B: Defer Promotion + Clear Culture Gates", votes: "24%" },
                      { id: "c", label: "Option C: Dual-Track Career Path (Principal IC)", votes: "18%" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setHeroOption(opt.id);
                          setHeroVoted(true);
                        }}
                        className={`w-full text-left rounded-xl p-3 text-xs transition-all border ${
                          heroOption === opt.id
                            ? "border-[#5850ec] bg-[#EEF2FF]/80 font-semibold text-slate-900 shadow-sm"
                            : "border-slate-200/80 bg-slate-50/70 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="line-clamp-1">{opt.label}</span>
                          {heroVoted && (
                            <span className="font-mono text-[10px] font-bold text-[#5850ec] shrink-0 ml-2">
                              {opt.votes}
                            </span>
                          )}
                        </div>

                        {/* Progress Bar when voted */}
                        {heroVoted && (
                          <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-200/80 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: opt.votes }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-[#5850ec] rounded-full"
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Card Action CTA */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-500">142 Student Solvers</span>
                    <Link
                      href="/vault"
                      className="inline-flex items-center gap-1.5 font-bold text-[#5850ec] hover:underline"
                    >
                      <span>Solve Full Case</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                </div>

              </AnimatedSection>

              {/* Floating Glass Badge 1: ATS Resume Score Widget (Top-Right Overflow) */}
              <FloatingElement className="absolute -top-6 -right-6 hidden sm:block z-20" delay={0.6} y={6} duration={4}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/90 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl ring-1 ring-slate-900/5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold font-mono text-xs">
                    96%
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">ATS Resume Vault</span>
                    <span className="text-xs font-bold text-slate-900">Vetted HR Formulas</span>
                  </div>
                </div>
              </FloatingElement>

              {/* Floating Glass Badge 2: Alumni Mentor Widget (Bottom-Left Overflow) */}
              <FloatingElement className="absolute -bottom-6 -left-6 hidden sm:block z-20" delay={0.8} y={6} duration={3.6}>
                <div className="flex items-center gap-3 rounded-2xl border border-white/90 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl ring-1 ring-slate-900/5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5850ec] text-white font-bold font-['Outfit'] text-xs">
                    GL
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono font-bold text-[#5850ec] block uppercase">Alumni Directory</span>
                    <span className="text-xs font-bold text-slate-900">50+ Placed HR Mentors</span>
                  </div>
                </div>
              </FloatingElement>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CORPORATE ALUMNI LOGO CLOUD (Refined Grayscale)
         ───────────────────────────────────────────────────────────── */}
      <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
          <p className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">
            GLIM Gurgaon HR Alumni Placed Across Top Global Firms
          </p>
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 font-['Outfit'] font-extrabold text-lg text-slate-700" stagger={0.1}>
            {["Amazon", "Deloitte", "Accenture", "Asian Paints", "TCS Global", "Flipkart", "Tech Mahindra"].map((name) => (
              <StaggerItem key={name}>
                <span className="hover:text-[#5850ec] hover:opacity-100 transition-all cursor-default">{name}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ─────────────────────────────────────────────────────────────
          3. CORE CAPABILITIES (3 Elevated Light Cards)
         ───────────────────────────────────────────────────────────── */}
      <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <AnimatedSection delay={0.1}>
              <div className="space-y-2 text-left">
                <span className="rounded-full bg-[#5850ec]/10 px-3.5 py-1 text-xs font-bold text-[#5850ec]">
                  Core Capabilities
                </span>
                <h2 className="font-['Outfit'] text-3xl font-extrabold sm:text-4xl text-slate-900">
                  Dive Deep Into Our HR Expertise, <br />
                  <span className="text-[#5850ec]">Explore All Our Hubs</span>
                </h2>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Link
                href="/vault"
                className="inline-flex items-center gap-2 rounded-full bg-[#5850ec] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#4b44dc]"
              >
                <span>Explore All Practice Hubs</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimatedSection>
          </div>

          {/* 3 Elevated Light Cards — staggered */}
          <StaggerContainer className="grid gap-6 sm:grid-cols-3" stagger={0.12}>
            <StaggerItem>
              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-4 hover:border-[#5850ec]/40 hover:bg-white hover:shadow-lg transition-all text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  Interview Prep Bank
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Round-by-round framework breakdowns for HR, Case, Psychometric, and GD rounds.
                </p>
                <Link href="/interview-prep" className="inline-block text-xs font-bold text-[#5850ec] hover:underline">
                  Access Guide →
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-4 hover:border-[#5850ec]/40 hover:bg-white hover:shadow-lg transition-all text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  Alumni Connect
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct contact directory of placed GLIM alumni across top HR firms & consultancies.
                </p>
                <Link href="/alumni" className="inline-block text-xs font-bold text-[#5850ec] hover:underline">
                  View Alumni →
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-4 hover:border-[#5850ec]/40 hover:bg-white hover:shadow-lg transition-all text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec]">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  The Vault Cases
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Daily real-world HR dilemmas designed to test executive judgment and strategic reasoning.
                </p>
                <Link href="/vault" className="inline-block text-xs font-bold text-[#5850ec] hover:underline">
                  Practice Cases →
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ─────────────────────────────────────────────────────────────
          4. SIGNATURE FEATURE: Daily Dilemma Simulator Component
         ───────────────────────────────────────────────────────────── */}
      <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5850ec]">
              Interactive Judgment Engine
            </span>
            <h2 className="font-['Outfit'] text-3xl font-extrabold text-slate-900 mt-1">
              Today&apos;s Executive HR Dilemma
            </h2>
          </div>
          <Link
            href="/vault"
            className="text-xs font-bold text-[#5850ec] hover:underline"
          >
            View All Past Cases →
          </Link>
        </div>

        <HrDilemmaSimulator />
      </AnimatedSection>

      {/* ─────────────────────────────────────────────────────────────
          5. BENTO SECTION: Ecosystem Directory Grid with MagicBento (01-06)
         ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8 text-left">
          <span className="rounded-full bg-[#5850ec]/10 px-3.5 py-1 text-xs font-bold text-[#5850ec]">
            Interactive Ecosystem Directory
          </span>
          <h2 className="font-['Outfit'] text-3xl font-extrabold text-slate-900 mt-2">
            Explore All Practice Hubs
          </h2>
          <p className="mt-2 text-xs text-slate-600 max-w-xl">
            Everything you need for HR placement readiness, alumni networking, case competitions, and industry news in one structured workspace.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <MagicBento 
            glowColor="88, 80, 236"
            particleCount={12}
            enableSpotlight={true}
            enableStars={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
          />
        </AnimatedSection>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. RECRUITER & ALUMNI GATEWAY
         ───────────────────────────────────────────────────────────── */}
      <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            
            <AnimatedSection className="lg:col-span-7 space-y-4 text-left" animation="slide-right" delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#5850ec]/10 px-3.5 py-1 text-xs font-bold text-[#5850ec]">
                <Building2 className="h-3.5 w-3.5" />
                <span>For Recruiters & Alumni</span>
              </div>

              <h2 className="font-['Outfit'] text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Partner with Harmony HR Club
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Recruiting top HR talent from GLIM Gurgaon? Connect with our committee to conduct guest lectures, host live project challenges, or access our candidate talent directory.
              </p>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center" animation="slide-left" delay={0.2}>
              <Link
                href="/alumni"
                className="flex items-center justify-center gap-2 rounded-full bg-[#5850ec] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5850ec]/30 hover:bg-[#4b44dc]"
              >
                <span>Join Alumni Network</span>
              </Link>
              <Link
                href="/team"
                className="flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-7 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-200"
              >
                <span>Contact Club Leadership</span>
              </Link>
            </AnimatedSection>

          </div>
        </div>
      </AnimatedSection>

    </div>
  );
}
