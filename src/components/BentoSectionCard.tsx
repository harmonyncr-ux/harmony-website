"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { 
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Newspaper,
  Trophy,
  FileText,
  Mail,
  Calendar,
  Bell,
  Users,
  ShieldAlert,
  Sparkles
} from "lucide-react";

const iconMap = {
  BookOpen,
  GraduationCap,
  Newspaper,
  Trophy,
  FileText,
  Mail,
  Calendar,
  Bell,
  Users,
  ShieldAlert,
  Sparkles
};

export type IconName = keyof typeof iconMap;

interface BentoCardProps {
  title: string;
  description: string;
  href: string;
  iconName: IconName;
  category: string;
  number?: string;
  badge?: string;
  size?: "normal" | "wide" | "tall";
  accentColor?: "gold" | "red" | "emerald" | "blue" | "purple" | "indigo";
}

export default function BentoSectionCard({
  title,
  description,
  href,
  iconName,
  category,
  number,
  badge,
  size = "normal",
}: BentoCardProps) {
  const Icon = iconMap[iconName] || BookOpen;

  const colSpanClass = {
    normal: "col-span-1",
    wide: "col-span-1 md:col-span-2",
    tall: "col-span-1 row-span-2",
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/40 transition-all hover:border-[#5850ec]/40 hover:shadow-2xl hover:shadow-[#5850ec]/10 ${colSpanClass[size]}`}
    >
      {/* Background Watermark Number (ZaiHR Style: 01, 02, 03) */}
      {number && (
        <span className="pointer-events-none absolute right-4 top-2 font-['Outfit'] text-7xl font-black tracking-tighter text-slate-100 opacity-60 select-none group-hover:text-[#EEF2FF] group-hover:opacity-100 transition-all">
          {number}
        </span>
      )}

      <div className="relative z-10 flex h-full flex-col justify-between space-y-6">
        <div>
          {/* Top Row: Icon badge + Tag */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec] shadow-sm group-hover:bg-[#5850ec] group-hover:text-white transition-all">
              <Icon className="h-5.5 w-5.5" />
            </div>

            {badge && (
              <span className="rounded-full bg-[#5850ec]/10 px-3 py-1 text-[10px] font-bold text-[#5850ec]">
                {badge}
              </span>
            )}
          </div>

          {/* Category Pill */}
          <div className="mt-5">
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-3 font-['Outfit'] text-2xl font-bold text-slate-900 group-hover:text-[#5850ec] transition-colors leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-2.5 text-xs leading-relaxed text-slate-600 font-normal">
            {description}
          </p>
        </div>

        {/* Footer Link Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#5850ec] group-hover:shadow-md group-hover:shadow-[#5850ec]/20"
          >
            <span>Explore Hub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
