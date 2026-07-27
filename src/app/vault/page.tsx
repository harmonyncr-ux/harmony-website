"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import HrDilemmaSimulator from "@/components/HrDilemmaSimulator";
import { ShieldAlert, History } from "lucide-react";
import { getHarmonyStore, VaultCaseItem } from "@/lib/adminStore";
import {
  AnimatedSection,
  AnimatedBadge,
  AnimatedHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

export default function VaultPage() {
  const [pastCases, setPastCases] = useState<VaultCaseItem[]>([]);

  useEffect(() => {
    const store = getHarmonyStore();
    setPastCases(store.vaultCases);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      
      {/* Page Header — staggered entrance */}
      <div className="space-y-4 max-w-3xl">
        <AnimatedBadge>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5850ec]/30 bg-[#EEF2FF] px-3.5 py-1 text-xs font-semibold text-[#5850ec]">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Core Habit Loop</span>
          </div>
        </AnimatedBadge>
        <AnimatedHeading delay={0.1}>
          <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
            The Vault
          </h1>
        </AnimatedHeading>
        <AnimatedSection delay={0.2}>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Practice judgment, not just memorized knowledge. Every day presents a new real-world HR dilemma facing modern organizations. No single &ldquo;right&rdquo; answer — only better strategic reasoning.
          </p>
        </AnimatedSection>
      </div>

      {/* Embedded Main Dilemma Simulator */}
      <AnimatedSection delay={0.1}>
        <section>
          <HrDilemmaSimulator />
        </section>
      </AnimatedSection>

      {/* Archive Header & Filter */}
      <section className="space-y-6 pt-6">
        <AnimatedSection>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-[#5850ec]" />
              <h2 className="font-['Outfit'] text-2xl font-bold text-slate-900">
                Previous Dilemma Vault
              </h2>
            </div>

            {/* Topic Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {["All Cases", "Performance", "Rewards & Comp", "Ethics", "Change Mgmt"].map((filter, idx) => (
                <button
                  key={filter}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    idx === 0
                      ? "bg-[#5850ec] text-white font-bold"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Case List Grid — staggered entrance */}
        <StaggerContainer className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
          {pastCases.map((c) => (
            <StaggerItem key={c.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#5850ec]/40 hover:shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{c.date}</span>
                    <span className="rounded-full bg-[#EEF2FF] px-2.5 py-0.5 text-[10px] font-bold text-[#5850ec]">
                      {c.topic}
                    </span>
                  </div>
                  <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 group-hover:text-[#5850ec] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {c.summary}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span>{c.responses} Student Submissions</span>
                  <span className="text-[#5850ec] font-bold group-hover:translate-x-0.5 transition-transform">
                    Solve Case →
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

    </div>
  );
}
