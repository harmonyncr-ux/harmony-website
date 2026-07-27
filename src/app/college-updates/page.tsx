"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bell } from "lucide-react";
import { getHarmonyStore, AnnouncementItem } from "@/lib/adminStore";
import {
  AnimatedSection,
  AnimatedBadge,
  AnimatedHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

export default function CollegeUpdatesPage() {
  const [updates, setUpdates] = useState<AnnouncementItem[]>([]);

  useEffect(() => {
    const store = getHarmonyStore();
    setUpdates(store.announcements);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      {/* Header — staggered entrance */}
      <div className="space-y-4 max-w-3xl">
        <AnimatedBadge>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-3.5 py-1 font-mono text-xs font-semibold text-blue-700">
            <Bell className="h-3.5 w-3.5 text-blue-600" />
            <span>Campus Notice Board</span>
          </div>
        </AnimatedBadge>
        <AnimatedHeading delay={0.1}>
          <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
            GLIM College Updates
          </h1>
        </AnimatedHeading>
        <AnimatedSection delay={0.2}>
          <p className="text-base text-slate-600 leading-relaxed">
            Official GLIM Gurgaon announcements, academic deadlines, and placement office notifications relevant to HR specialization students.
          </p>
        </AnimatedSection>
      </div>

      {/* Update cards — staggered entrance */}
      <StaggerContainer className="space-y-4 max-w-4xl" stagger={0.1}>
        {updates.map((u) => (
          <StaggerItem key={u.id}>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-2 hover:border-[#5850ec]/40 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-700 font-bold border border-blue-200">
                  {u.category}
                </span>
                <span>{u.date}</span>
              </div>
              <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                {u.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {u.content}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
