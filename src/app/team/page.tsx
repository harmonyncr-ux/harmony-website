"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Mail, Shield } from "lucide-react";
import LinkedinIcon from "@/components/LinkedinIcon";
import { getHarmonyStore, TeamMemberItem, FacultyAdvisor } from "@/lib/adminStore";
import {
  AnimatedSection,
  AnimatedBadge,
  AnimatedHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);
  const [mentor, setMentor] = useState<FacultyAdvisor>({
    name: "Dr. Rajesh K. Nair",
    role: "Faculty Advisor & Professor of OB & HR",
    department: "Organizational Behavior & Human Resources",
    institution: "Great Lakes Institute of Management Gurgaon",
    bio: "Over 20 years of research and corporate consulting experience in strategic human resource management, executive leadership development, and change management.",
  });

  useEffect(() => {
    const store = getHarmonyStore();
    if (store.teamMembers) setTeamMembers(store.teamMembers);
    if (store.facultyAdvisor) setMentor(store.facultyAdvisor);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      
      {/* Header — staggered entrance */}
      <div className="space-y-4 max-w-3xl">
        <AnimatedBadge>
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-50 px-3.5 py-1 font-mono text-xs font-semibold text-purple-700">
            <Users className="h-3.5 w-3.5 text-purple-600" />
            <span>Leadership & Governance</span>
          </div>
        </AnimatedBadge>
        <AnimatedHeading delay={0.1}>
          <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Team & Faculty Mentors
          </h1>
        </AnimatedHeading>
        <AnimatedSection delay={0.2}>
          <p className="text-base text-slate-600 leading-relaxed">
            The student leaders and faculty guidance steering Harmony HR Club at GLIM Gurgaon. Driven by passion for workplace excellence and student career readiness.
          </p>
        </AnimatedSection>
      </div>

      {/* Faculty Advisor Section — fade-in-up */}
      <AnimatedSection animation="scale-up" delay={0.1}>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#5850ec] uppercase tracking-wider">
            <Shield className="h-4 w-4" />
            <span>Faculty Advisory</span>
          </div>
          <div className="space-y-2">
            <h2 className="font-['Outfit'] text-2xl font-bold text-slate-900">
              {mentor.name}
            </h2>
            <p className="text-xs font-semibold text-[#5850ec]">
              {mentor.role}
            </p>
            <p className="text-xs font-mono text-slate-500">
              {mentor.department} • {mentor.institution}
            </p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            {mentor.bio}
          </p>
        </div>
      </AnimatedSection>

      {/* Core Student Board */}
      <div className="space-y-6">
        <AnimatedHeading delay={0.1}>
          <h2 className="font-['Outfit'] text-2xl font-bold text-slate-900">
            Executive Student Board (2025–2026)
          </h2>
        </AnimatedHeading>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {teamMembers.map((m) => (
            <StaggerItem key={m.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4 hover:border-[#5850ec]/40 transition-all"
              >
                <div className="space-y-3">
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5850ec] font-['Outfit'] text-lg font-bold text-white shadow-md"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {m.name.split(" ").map(n => n[0]).join("")}
                  </motion.div>
                  <div>
                    <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
                      {m.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#5850ec] mt-0.5">
                      {m.role}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500 block mt-1">
                      {m.batch}
                    </span>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-2.5 text-[11px] text-slate-700">
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-0.5">
                      Focus Area
                    </span>
                    <span>{m.focus}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
                  <a
                    href={`mailto:${m.email}`}
                    className="flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-[#5850ec] transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span>Email</span>
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href={m.linkedin || "#"}
                    className="flex items-center gap-1 text-[11px] font-mono text-blue-600 hover:underline"
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

    </div>
  );
}
