"use client";

import { useState, useEffect } from "react";
import { Newspaper, ExternalLink, Clock, Sparkles } from "lucide-react";
import { getHarmonyStore, HrNewsItem } from "@/lib/adminStore";

export default function HrNewsPage() {
  const [newsList, setNewsList] = useState<HrNewsItem[]>([]);

  useEffect(() => {
    const store = getHarmonyStore();
    setNewsList(store.hrNews || []);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-50 px-3.5 py-1 font-mono text-xs font-semibold text-purple-700">
          <Newspaper className="h-3.5 w-3.5 text-purple-600" />
          <span>Regulatory & Market Intelligence Beat</span>
        </div>
        <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
          HR News Portal
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Curated daily HR, labor compliance, total rewards, and workplace tech developments parsed and summarized for GLIM Gurgaon students.
        </p>
      </div>

      {/* Featured AI Digest Bar */}
      <div className="rounded-3xl border border-[#5850ec]/20 bg-indigo-50/50 p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5850ec] text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Weekly HR Brief Digest
            </h3>
            <p className="text-xs text-slate-600">
              Summarized key policy shifts across Indian labor codes & HR tech trends.
            </p>
          </div>
        </div>
        <button className="rounded-full bg-[#5850ec] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4b44dc]">
          Read Executive Summary
        </button>
      </div>

      {/* News Feed Grid */}
      <div className="space-y-6">
        <h2 className="font-['Outfit'] text-2xl font-bold text-slate-900">
          Latest Industry Updates
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4 hover:border-[#5850ec]/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="rounded-full bg-[#EEF2FF] px-2.5 py-0.5 text-[10px] font-bold text-[#5850ec]">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 hover:text-[#5850ec] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  {item.readTime}
                </span>
                <span className="text-slate-400">Source: <strong className="text-slate-700">{item.source}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
