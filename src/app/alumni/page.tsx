"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GraduationCap, MapPin, Mail, Search } from "lucide-react";
import LinkedinIcon from "@/components/LinkedinIcon";
import { getHarmonyStore, AlumniItem } from "@/lib/adminStore";
import AuthGuard from "@/components/AuthGuard";
import {
  AnimatedSection,
  AnimatedBadge,
  AnimatedHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<AlumniItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const store = getHarmonyStore();
    setAlumni(store.alumni);
  }, []);

  const filtered = alumni.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.company.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase()) ||
    a.focusArea.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      
      {/* Page Header — Public Preview */}
      <div className="space-y-4 max-w-3xl">
        <AnimatedBadge>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5850ec]/30 bg-[#EEF2FF] px-3.5 py-1 font-mono text-xs font-semibold text-[#5850ec]">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Mentorship Network</span>
          </div>
        </AnimatedBadge>
        <AnimatedHeading delay={0.1}>
          <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Alumni Connect Network
          </h1>
        </AnimatedHeading>
        <AnimatedSection delay={0.2}>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Direct directory of placed Great Lakes Gurgaon alumni working across leading HR, consulting, tech, and corporate HR functions.
          </p>
        </AnimatedSection>
      </div>

      {/* Protected Directory — Student Only Access */}
      <AuthGuard
        title="Alumni Directory Access"
        description="Please sign in with your Great Lakes Gurgaon Google account to view direct alumni contact emails and LinkedIn mentorship profiles."
      >
        <div className="space-y-6">
          {/* Search Input */}
          <AnimatedSection delay={0.1}>
            <div className="relative max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, company, or domain..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-xs text-slate-900 shadow-sm focus:border-[#5850ec] focus:outline-none"
              />
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            </div>
          </AnimatedSection>

          {/* Alumni Directory Grid — staggered */}
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {filtered.map((a) => (
              <StaggerItem key={a.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4 hover:border-[#5850ec]/40 transition-all text-left"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                      <span className="rounded-full bg-[#EEF2FF] px-2.5 py-0.5 text-[10px] font-bold text-[#5850ec]">
                        {a.batch}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {a.location}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                        {a.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#5850ec] mt-0.5">
                        {a.role}
                      </p>
                      <p className="text-xs font-bold text-slate-800">
                        {a.company}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3 text-xs text-slate-700">
                      <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-0.5">
                        Focus Domain
                      </span>
                      <span>{a.focusArea}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-mono">
                    <a
                      href={`mailto:${a.email}`}
                      className="flex items-center gap-1.5 text-slate-600 hover:text-[#5850ec] transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>Contact Email</span>
                    </a>
                    <a
                      href={a.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-blue-600 hover:underline font-bold"
                    >
                      <LinkedinIcon className="h-3.5 w-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AuthGuard>

    </div>
  );
}
