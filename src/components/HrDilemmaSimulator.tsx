"use client";

import { useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { 
  ShieldAlert, 
  Flame, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw,
  BrainCircuit,
  MessageSquare
} from "lucide-react";

interface Option {
  id: string;
  label: string;
  description: string;
  votes: number;
  rationale: string;
}

const currentCase = {
  id: "case-042",
  number: "#042",
  date: "July 23, 2026",
  title: "The Star Performer vs. Team Culture Dilemma",
  topic: "Performance vs Culture",
  difficulty: "Executive Dilemma",
  scenario:
    "You are the HR Business Partner for a high-growth tech division. The VP of Engineering insists on promoting Aditi — a brilliant lead architect who delivered 3 consecutive record-breaking quarters. However, her 360° peer feedback is disastrous: 85% of her team report feeling demotivated and micromanaged by her. The VP argues: 'Results are what pay the bills.' How do you intervene?",
  options: [
    {
      id: "a",
      label: "Option A: Conditional Promotion + Executive Coaching",
      description: "Approve promotion provisionally with a mandatory 6-month leadership coaching program and quarterly 360-checkpoints.",
      votes: 52,
      rationale: "Balances business momentum with accountability, but requires heavy HR coaching bandwidth and risks team cynicism if progress stalls."
    },
    {
      id: "b",
      label: "Option B: Defer Promotion + Clear Culture Gates",
      description: "Defer promotion to the next cycle. Set explicit, measurable collaboration and mentorship goals required before re-evaluation.",
      votes: 24,
      rationale: "Sends a powerful message that culture is non-negotiable. However, risks alienating Aditi and triggering a high-performer flight risk."
    },
    {
      id: "c",
      label: "Option C: Dual-Track Career Path (Principal IC)",
      description: "Promote her to Principal Individual Contributor with equivalent pay/status, removing managerial/people authority.",
      votes: 18,
      rationale: "Modern HR best practice for technical stars. Preserves revenue impact while protecting team morale from toxic management."
    },
    {
      id: "d",
      label: "Option D: Immediate Full Promotion as Requested",
      description: "Promote her outright as requested by the VP, relying on organic performance to resolve interpersonal friction over time.",
      votes: 6,
      rationale: "Prioritizes immediate business output above all else. Highest risk of team attrition and culture degradation."
    }
  ] as Option[]
};

export default function HrDilemmaSimulator() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [streakCount, setStreakCount] = useState(12);

  const handleVote = () => {
    if (!selectedOption || hasVoted) return;
    setHasVoted(true);
    setStreakCount((prev) => prev + 1);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#5850ec", "#818cf8", "#38bdf8"]
      });
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    setHasVoted(false);
    setSelectedOption(null);
  };

  const totalVotes = currentCase.options.reduce((acc, opt) => acc + opt.votes, 0) + (hasVoted ? 1 : 0);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xl">
      
      {/* Background Subtle Radial Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#5850ec]/10 blur-3xl" />

      {/* Case Header */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec]">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#5850ec]">{currentCase.number}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-500">{currentCase.date}</span>
              <span className="rounded-full bg-[#5850ec]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#5850ec]">
                {currentCase.difficulty}
              </span>
            </div>
            <h3 className="font-['Outfit'] text-2xl font-bold text-slate-900 mt-0.5">
              {currentCase.title}
            </h3>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-2 rounded-full border border-[#5850ec]/30 bg-[#EEF2FF] px-4 py-1.5 shadow-sm">
          <Flame className="h-4 w-4 text-[#5850ec] animate-bounce" />
          <span className="font-mono text-xs font-bold text-slate-900">
            {streakCount} Day Streak
          </span>
        </div>
      </div>

      {/* Dilemma Scenario */}
      <div className="relative mt-6 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-5">
        <p className="text-sm leading-relaxed text-slate-800 sm:text-base font-normal">
          &ldquo;{currentCase.scenario}&rdquo;
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-200/60 pt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <BrainCircuit className="h-3.5 w-3.5 text-[#5850ec]" />
            Topic: <strong className="text-slate-900">{currentCase.topic}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            Submissions Today: <strong className="text-slate-900">{totalVotes} Students</strong>
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="mt-6 space-y-3">
        <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#5850ec]">
          Select Your Recommended Action:
        </h4>

        <div className="grid gap-3">
          {currentCase.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const votePercent = Math.round(
              ((opt.votes + (hasVoted && isSelected ? 1 : 0)) / totalVotes) * 100
            );

            return (
              <div
                key={opt.id}
                onClick={() => !hasVoted && setSelectedOption(opt.id)}
                className={`group relative overflow-hidden rounded-2xl border p-4 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#5850ec] bg-[#EEF2FF]"
                    : "border-slate-200 bg-[#F8FAFC] hover:border-[#5850ec]/40 hover:bg-white"
                } ${hasVoted ? "cursor-default" : ""}`}
              >
                {hasVoted && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${votePercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`absolute inset-y-0 left-0 -z-0 ${
                      isSelected ? "bg-[#5850ec]/20" : "bg-slate-200/50"
                    }`}
                  />
                )}

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-['Outfit'] font-bold text-sm text-slate-900">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span className="rounded-full bg-[#5850ec] px-2 py-0.2 font-mono text-[9px] font-bold text-white">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      {opt.description}
                    </p>

                    {hasVoted && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 rounded-xl border border-[#5850ec]/30 bg-white p-3 text-[11px] text-slate-700 shadow-sm"
                      >
                        <span className="font-mono font-semibold text-[#5850ec]">HRBP Analysis: </span>
                        {opt.rationale}
                      </motion.div>
                    )}
                  </div>

                  {hasVoted ? (
                    <div className="text-right font-mono text-sm font-bold text-[#5850ec]">
                      {votePercent}%
                    </div>
                  ) : (
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isSelected ? "border-[#5850ec] bg-[#5850ec] text-white" : "border-slate-300 bg-white"
                    }`}>
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
        {!hasVoted ? (
          <button
            onClick={handleVote}
            disabled={!selectedOption}
            className={`flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold text-white transition-all ${
              selectedOption
                ? "bg-[#5850ec] shadow-lg shadow-[#5850ec]/30 hover:bg-[#4b44dc] hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Submit Your Judgment</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Judgment Recorded (+10 XP)
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Change Vote</span>
            </button>
          </div>
        )}

        <button className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors">
          <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
          <span>Join Discussion (14)</span>
        </button>
      </div>

    </div>
  );
}
