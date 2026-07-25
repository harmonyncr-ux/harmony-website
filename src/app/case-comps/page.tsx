"use client";

import { useState, useEffect } from "react";
import { Trophy, ExternalLink } from "lucide-react";
import { getHarmonyStore, CaseCompItem } from "@/lib/adminStore";

export default function CaseCompsPage() {
  const [competitions, setCompetitions] = useState<CaseCompItem[]>([]);

  useEffect(() => {
    const store = getHarmonyStore();
    setCompetitions(store.caseComps || []);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-50 px-3.5 py-1 font-mono text-xs font-semibold text-purple-700">
          <Trophy className="h-3.5 w-3.5 text-purple-600" />
          <span>National Case Competitions</span>
        </div>
        <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
          MBA Case Comps Hub
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Compete on national stages. Access curated listings of premier HR and general management case competitions, winning strategy frameworks, and past benchmark decks.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {competitions.map((c) => (
          <div
            key={c.id}
            className={`group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all hover:border-[#5850ec]/40 hover:shadow-xl ${
              c.featured ? "sm:col-span-2 lg:col-span-2 border-[#5850ec]/30" : ""
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-purple-700 border border-purple-200 font-bold">
                  {c.category}
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-700 font-bold border border-emerald-200">
                  {c.status}
                </span>
              </div>

              <h3 className={`font-['Outfit'] font-bold text-slate-900 group-hover:text-[#5850ec] transition-colors ${
                c.featured ? "text-2xl" : "text-xl"
              }`}>
                {c.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {c.description}
              </p>

              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-3.5 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Prize Pool & Perks</span>
                  <span className="font-bold text-[#5850ec]">{c.prize}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Registration Deadline</span>
                  <span className="font-bold text-slate-900">{c.deadline}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-mono">
              <span className="text-slate-500">Sponsor: <strong className="text-slate-900">{c.sponsor}</strong></span>
              <a
                href="#"
                className="flex items-center gap-1 text-[#5850ec] hover:underline font-bold"
              >
                <span>Register / View Brief</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
