"use client";

import { BookOpen, Lightbulb } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import {
  AnimatedSection,
  AnimatedBadge,
  AnimatedHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

const rounds = [
  {
    id: "hr-round",
    title: "1. HR & Behavioral Round",
    tag: "Core Focus",
    description: "Focuses on personal motivation, alignment with corporate values, behavioral STAR scenarios, and handling tough questions.",
    questions: [
      {
        q: "Why do you want to specialize in HR rather than Marketing or Operations?",
        framework: "Passion + Business Value Alignment",
        answer: "Frame HR not just as 'liking people', but as strategic human capital management. Emphasize how talent strategy directly drives EBIT performance, organizational agility, and competitive advantage in modern enterprise."
      },
      {
        q: "Tell me about a time when you had to enforce an unpopular policy.",
        framework: "STAR Method (Situation, Task, Action, Result)",
        answer: "Describe a real situation. Emphasize transparent communication, listening to employee concerns, explaining the 'why' behind the leadership decision, and measuring compliance metrics afterwards."
      }
    ]
  },
  {
    id: "case-round",
    title: "2. HR Case & Problem Solving Round",
    tag: "High Weightage",
    description: "Evaluates your ability to structure complex HR problems: restructuring, post-merger culture integration, compensation re-design, and attrition analysis.",
    questions: [
      {
        q: "Case: Tech Mahindra is acquiring a 500-person AI startup with 3x higher salary benchmarks. How do you handle pay parity?",
        framework: "Phase-based Retention & Integration Matrix",
        answer: "Structure your answer in 4 pillars: 1. Key Talent Retention Bonuses (lock-in period), 2. Ring-fencing core tech stack, 3. Phased 2-year compensation alignment plan, 4. Cultural integration town halls."
      }
    ]
  },
  {
    id: "psychometric",
    title: "3. Psychometric & Situational Judgment Tests (SJT)",
    tag: "Assessment Center",
    description: "Strategies for clearing SHL, Predictive Index, and Hogan Personality assessments used by FMCGs and MNC recruiters.",
    questions: [
      {
        q: "How to approach Situational Judgment Scenarios where two core values conflict?",
        framework: "Ethical Prioritization Framework",
        answer: "Identify the non-negotiables first (legal/compliance > ethical integrity > team morale > short-term revenue). Consistency across questions matters more than trying to guess the recruiter's 'ideal profile'."
      }
    ]
  },
  {
    id: "group-exercise",
    title: "4. Group Discussion & Consensus Building",
    tag: "Leadership Simulation",
    description: "How to lead group exercises without dominating, synthesize diverse opinions, and drive consensus in corporate GDs.",
    questions: [
      {
        q: "What is the winning strategy when two candidates get aggressive in a GD?",
        framework: "Facilitator Interruption Technique",
        answer: "Step in calmly: 'Both of your points on compensation versus culture are valid. Let's look at how we can reconcile them into our overall recommendation.' This showcases executive maturity."
      }
    ]
  }
];

export default function InterviewPrepPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      
      {/* Header — Public Preview */}
      <div className="space-y-4 max-w-3xl">
        <AnimatedBadge>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5850ec]/30 bg-[#EEF2FF] px-3.5 py-1 font-mono text-xs font-semibold text-[#5850ec]">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Flagship Placement Asset</span>
          </div>
        </AnimatedBadge>
        <AnimatedHeading delay={0.1}>
          <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Interview Prep Guide
          </h1>
        </AnimatedHeading>
        <AnimatedSection delay={0.2}>
          <p className="text-base text-slate-600 leading-relaxed">
            Master every stage of the HR placement process. Round-by-round strategy guides, real interview questions from top recruiting firms, framework cheat-sheets, and sample answers.
          </p>
        </AnimatedSection>
      </div>

      {/* Protected Strategy Bank — Student Only Access */}
      <AuthGuard
        title="Interview Strategy Bank Access"
        description="Please sign in with your Great Lakes Gurgaon Google account to view benchmark interview frameworks and sample recruiter-tested answers."
      >
        <StaggerContainer className="space-y-10 text-left" stagger={0.12}>
          {rounds.map((r) => (
            <StaggerItem key={r.id}>
              <div
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#5850ec] uppercase tracking-wider">
                      {r.tag}
                    </span>
                    <h2 className="font-['Outfit'] text-2xl font-bold text-slate-900 mt-0.5">
                      {r.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {r.description}
                </p>

                {/* Questions List — staggered within round */}
                <StaggerContainer className="grid gap-4" stagger={0.1}>
                  {r.questions.map((q, idx) => (
                    <StaggerItem key={idx}>
                      <div
                        className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#5850ec] font-mono text-xs font-bold text-white">
                            Q
                          </span>
                          <h3 className="font-['Outfit'] text-base font-bold text-slate-900 leading-snug">
                            {q.q}
                          </h3>
                        </div>

                        <div className="ml-9 space-y-2">
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] px-3 py-1 font-mono text-[11px] font-bold text-[#5850ec]">
                            <Lightbulb className="h-3 w-3" />
                            <span>Recommended Framework: {q.framework}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            <strong className="text-slate-900">Sample Approach: </strong>
                            {q.answer}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AuthGuard>

    </div>
  );
}
