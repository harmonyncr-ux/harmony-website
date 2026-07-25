import Link from "next/link";
import Image from "next/image";
import HrDilemmaSimulator from "@/components/HrDilemmaSimulator";
import BentoSectionCard, { IconName } from "@/components/BentoSectionCard";
import { UnderlineDoodle, ArrowDoodle } from "@/components/DoodleAccents";
import { 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Building2,
  TrendingUp,
  BookOpen,
  GraduationCap,
  ShieldAlert
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
  return (
    <div className="space-y-20 pb-20 bg-[#f8fafc]">
      
      {/* ZaiHR Hero Section (100% Light Theme) */}
      <section className="relative overflow-hidden bg-[#f8fafc] pt-12 pb-20 text-slate-900">
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            
            {/* Main ZaiHR Headline */}
            <div className="relative">
              <h1 className="font-['Outfit'] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.08]">
                Empower Your HR Strategy, <br />
                Discover Your <span className="relative inline-block text-[#5850ec]">
                  Ideal Leadership
                  <UnderlineDoodle className="absolute -bottom-3 left-0 text-[#5850ec]" />
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-base text-slate-600 sm:text-lg leading-relaxed max-w-2xl font-normal pt-2">
              Harmony bridges the gap between academic theory and real-world HR executive decision-making. Practice daily case dilemmas, access interview prep banks, and connect with top alumni.
            </p>

            {/* Double Periwinkle Pill CTAs + Arrow Doodle */}
            <div className="relative flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/vault"
                className="flex items-center gap-2.5 rounded-full bg-[#5850ec] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#5850ec]/30 transition-all hover:bg-[#4b44dc] hover:scale-105 active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-indigo-100" />
                <span>Practice Daily Dilemma</span>
              </Link>

              <Link
                href="/interview-prep"
                className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 transition-all hover:border-slate-400 hover:bg-slate-50"
              >
                <span>Interview Prep Bank</span>
              </Link>

              {/* Hand-drawn Loop Arrow Doodle */}
              <div className="absolute -right-12 -bottom-8 hidden md:block">
                <ArrowDoodle className="h-10 w-10 text-[#5850ec] rotate-45" />
              </div>
            </div>

          </div>

          {/* Hero Image Framed Container (Featuring Official GL GGN Harmony Logo) */}
          <div className="relative mt-16 mx-auto max-w-5xl rounded-3xl border-4 border-slate-200 bg-white p-4 sm:p-6 shadow-2xl overflow-hidden">
            
            <div className="relative h-[320px] sm:h-[400px] w-full rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-800 shadow-inner">
              
              <div className="relative z-10 text-center space-y-4 p-6">
                <div className="mx-auto flex justify-center">
                  <Image 
                    src="/GL GGN_harmony.png" 
                    alt="Great Lakes Gurgaon Harmony Official Logo" 
                    width={360}
                    height={120}
                    className="h-20 sm:h-24 w-auto object-contain"
                  />
                </div>

                <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
                  Harmony HR Practice Environment
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Over 100+ MBA HR Students active daily practicing case dilemmas, interview prep, and corporate compliance scenarios.
                </p>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute top-6 left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/90 p-3 shadow-lg backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-400 block">Interview Readiness</span>
                  <span className="font-mono text-xs font-bold text-white">98% Benchmark Score</span>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/90 p-3 shadow-lg backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5850ec]/20 text-[#5850ec] border border-[#5850ec]/30">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-400 block">Active Community</span>
                  <span className="font-mono text-xs font-bold text-white">50+ Placed Mentors</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Grayscale Corporate Logo Cloud */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
          <p className="text-center font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">
            GLIM Gurgaon HR Alumni Placed Across Top Global Firms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 font-['Outfit'] font-extrabold text-lg text-slate-700">
            <span>Amazon</span>
            <span>Deloitte</span>
            <span>Accenture</span>
            <span>Asian Paints</span>
            <span>TCS Global</span>
            <span>Flipkart</span>
          </div>
        </div>
      </section>

      {/* Light Capability Section ("Dive Deep Into Our HR Expertise") */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
              <span className="rounded-full bg-[#5850ec]/10 px-3.5 py-1 font-mono text-xs font-bold text-[#5850ec]">
                Core Capabilities
              </span>
              <h2 className="font-['Outfit'] text-3xl font-extrabold sm:text-4xl text-slate-900">
                Dive Deep Into Our HR Expertise, <br />
                <span className="text-[#5850ec]">Explore All Our Hubs</span>
              </h2>
            </div>
            <Link
              href="/vault"
              className="inline-flex items-center gap-2 rounded-full bg-[#5850ec] px-6 py-3 font-mono text-xs font-bold text-white shadow-md hover:bg-[#4b44dc]"
            >
              <span>Explore All Practice Hubs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 3 Elevated Light Cards */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-4 hover:border-[#5850ec]/40 hover:bg-white hover:shadow-lg transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec]">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                Interview Prep Bank
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Round-by-round framework breakdowns for HR, Case, Psychometric, and GD rounds.
              </p>
              <Link href="/interview-prep" className="inline-block font-mono text-xs font-bold text-[#5850ec] hover:underline">
                Access Guide →
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-4 hover:border-[#5850ec]/40 hover:bg-white hover:shadow-lg transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec]">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                Alumni Connect
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct contact directory of placed GLIM alumni across top HR firms & consultancies.
              </p>
              <Link href="/alumni" className="inline-block font-mono text-xs font-bold text-[#5850ec] hover:underline">
                View Alumni →
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-4 hover:border-[#5850ec]/40 hover:bg-white hover:shadow-lg transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec]">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                The Vault Cases
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Daily real-world HR dilemmas designed to test executive judgment and strategic reasoning.
              </p>
              <Link href="/vault" className="inline-block font-mono text-xs font-bold text-[#5850ec] hover:underline">
                Practice Cases →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Feature: Daily Dilemma Simulator */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5850ec]">
              Interactive Judgment Engine
            </span>
            <h2 className="font-['Outfit'] text-3xl font-extrabold text-slate-900 mt-1">
              Today&apos;s Executive HR Dilemma
            </h2>
          </div>
          <Link
            href="/vault"
            className="font-mono text-xs font-bold text-[#5850ec] hover:underline"
          >
            View All Past Cases →
          </Link>
        </div>

        <HrDilemmaSimulator />
      </section>

      {/* ZaiHR Light Bento Section ("01", "02", "03" Watermark Grid) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="rounded-full bg-[#5850ec]/10 px-3.5 py-1 font-mono text-xs font-bold text-[#5850ec]">
            Ecosystem Directory
          </span>
          <h2 className="font-['Outfit'] text-3xl font-extrabold text-slate-900 mt-2">
            Explore All Practice Hubs
          </h2>
          <p className="mt-2 text-xs text-slate-600 max-w-xl">
            Everything you need for HR placement readiness, alumni networking, case competitions, and industry news in one structured workspace.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bentoSections.map((sec) => (
            <BentoSectionCard key={sec.title} {...sec} />
          ))}
        </div>
      </section>

      {/* Recruiter & Alumni Gateway */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#5850ec]/10 px-3.5 py-1 font-mono text-xs font-bold text-[#5850ec]">
                <Building2 className="h-3.5 w-3.5" />
                <span>For Recruiters & Alumni</span>
              </div>

              <h2 className="font-['Outfit'] text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Partner with Harmony HR Club
              </h2>

              <p className="text-sm leading-relaxed text-slate-600">
                Recruiting top HR talent from GLIM Gurgaon? Connect with our committee to conduct guest lectures, host live project challenges, or access our candidate talent directory.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
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
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
