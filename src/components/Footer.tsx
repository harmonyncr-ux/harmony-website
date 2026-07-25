import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, BookOpen, GraduationCap, Trophy, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-85">
              <Image 
                src="/clg.png" 
                alt="Great Lakes Logo" 
                width={120}
                height={36}
                className="h-7 w-auto object-contain brightness-0" 
              />
              <span className="text-slate-300 font-light text-sm select-none">|</span>
              <Image 
                src="/GL GGN_harmony.png" 
                alt="Harmony HR Club Logo" 
                width={140}
                height={36}
                className="h-7 w-auto object-contain brightness-0" 
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-600 pt-1">
              Empowering tomorrow&apos;s HR leaders. Great Lakes Institute of Management Gurgaon&apos;s flagship HR student community.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5850ec]/30 bg-[#5850ec]/10 px-3 py-1 font-mono text-[11px] text-[#5850ec]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                GLIM Gurgaon Chapter
              </span>
            </div>
          </div>

          {/* Col 2: Core Hubs */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#5850ec]">
              Core Practice Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/vault" className="flex items-center gap-2 hover:text-[#5850ec] transition-colors group">
                  <ShieldAlert className="h-3.5 w-3.5 text-[#5850ec]" />
                  <span>The Vault (Daily Cases)</span>
                </Link>
              </li>
              <li>
                <Link href="/interview-prep" className="flex items-center gap-2 hover:text-[#5850ec] transition-colors group">
                  <BookOpen className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#5850ec]" />
                  <span>Interview Prep Bank</span>
                </Link>
              </li>
              <li>
                <Link href="/hr-news" className="flex items-center gap-2 hover:text-[#5850ec] transition-colors group">
                  <Trophy className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#5850ec]" />
                  <span>HR News & Intelligence</span>
                </Link>
              </li>
              <li>
                <Link href="/case-comps" className="flex items-center gap-2 hover:text-[#5850ec] transition-colors group">
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#5850ec]" />
                  <span>MBA Case Competitions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#5850ec]">
              Student Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/cv-resources" className="hover:text-[#5850ec] transition-colors">
                  CV Templates & ATS Guide
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-[#5850ec] transition-colors">
                  Monthly Newsletter Archive
                </Link>
              </li>
              <li>
                <Link href="/college-updates" className="hover:text-[#5850ec] transition-colors">
                  GLIM Campus Announcements
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#5850ec] transition-colors">
                  Workshops & Keynote Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Network */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#5850ec]">
              Alumni & Recruiters
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/alumni" className="flex items-center gap-2 hover:text-[#5850ec] transition-colors group">
                  <GraduationCap className="h-3.5 w-3.5 text-[#5850ec]" />
                  <span>Alumni Connect Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[#5850ec] transition-colors">
                  Core Student Board & Advisor
                </Link>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-900 block mb-1">
                Newsletter Subscription
              </span>
              <div className="mt-2 flex items-center gap-1.5">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#5850ec]"
                />
                <button className="rounded-full bg-[#5850ec] px-3 py-1.5 font-mono text-xs font-bold text-white hover:bg-[#4b44dc]">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Harmony HR Club, Great Lakes Institute of Management Gurgaon. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-slate-600">Master HR Judgment</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-[#5850ec] font-bold">GLIM Gurgaon Chapter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
