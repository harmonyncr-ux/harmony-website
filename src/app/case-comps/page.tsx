"use client";

import { useState, useEffect, useCallback } from "react";
import { Trophy, ExternalLink, RefreshCw, Radio, Filter, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { getHarmonyStore, CaseCompItem } from "@/lib/adminStore";

export default function CaseCompsPage() {
  const [competitions, setCompetitions] = useState<CaseCompItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<"All" | "Registration Open" | "Upcoming" | "Expired">("All");

  const fetchLiveCompetitions = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/case-comps");
      const store = getHarmonyStore();
      const fallbackComps = store.caseComps || [];

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          setCompetitions(data.items);
          setIsLive(true);
        } else {
          setCompetitions(fallbackComps);
          setIsLive(false);
        }
      } else {
        setCompetitions(fallbackComps);
        setIsLive(false);
      }
    } catch {
      const store = getHarmonyStore();
      setCompetitions(store.caseComps || []);
      setIsLive(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveCompetitions();
  }, [fetchLiveCompetitions]);

  const activeCount = competitions.filter((c) => c.status === "Registration Open").length;
  const upcomingCount = competitions.filter((c) => c.status === "Upcoming").length;
  const expiredCount = competitions.filter((c) => c.status === "Expired").length;

  const filteredList = competitions.filter((c) => {
    if (filterStatus === "All") return true;
    return c.status === filterStatus;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 bg-[#f8fafc]">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-50 px-3.5 py-1 text-xs font-semibold text-purple-700">
            <Trophy className="h-3.5 w-3.5 text-purple-600" />
            <span>National Case Competitions</span>
          </div>

          {isLive && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <Radio className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
              <span>Live Unstop Stream</span>
            </div>
          )}
        </div>

        <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
          MBA Case Comps Hub
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Compete on national stages. Access curated listings of premier HR, strategy, and analytics case challenges. Track active registrations, upcoming launches, and archived benchmark briefs.
        </p>
      </div>

      {/* Competitions Section Header & Filter Pills */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-4">
          
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterStatus("All")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                filterStatus === "All"
                  ? "bg-[#5850ec] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Filter className="h-3 w-3" />
              <span>All ({competitions.length})</span>
            </button>

            <button
              onClick={() => setFilterStatus("Registration Open")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                filterStatus === "Registration Open"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/70"
              }`}
            >
              <CheckCircle2 className="h-3 w-3" />
              <span>Live & Active ({activeCount})</span>
            </button>

            <button
              onClick={() => setFilterStatus("Upcoming")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                filterStatus === "Upcoming"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100/70"
              }`}
            >
              <Clock className="h-3 w-3" />
              <span>Upcoming ({upcomingCount})</span>
            </button>

            <button
              onClick={() => setFilterStatus("Expired")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                filterStatus === "Expired"
                  ? "bg-rose-600 text-white shadow-md"
                  : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100/70"
              }`}
            >
              <AlertCircle className="h-3 w-3" />
              <span>Expired ({expiredCount})</span>
            </button>
          </div>

          <button
            onClick={fetchLiveCompetitions}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-[#5850ec]/40 hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-50 self-start sm:self-auto"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#5850ec] ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>

        {loading ? (
          /* Skeletons */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="h-64 rounded-3xl border border-slate-200 bg-white p-6 shadow-md animate-pulse space-y-4">
                <div className="h-4 w-24 bg-slate-200 rounded-full" />
                <div className="h-6 w-full bg-slate-200 rounded-lg" />
                <div className="h-12 w-full bg-slate-100 rounded-lg" />
              </div>
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-600">No competitions found for status "{filterStatus}".</p>
            <button
              onClick={() => setFilterStatus("All")}
              className="text-xs font-bold text-[#5850ec] hover:underline"
            >
              Show all competitions
            </button>
          </div>
        ) : (
          /* Competitions Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredList.map((c) => {
              const compLink = (c.link && c.link !== "https://unstop.com")
                ? c.link
                : `https://unstop.com/all-opportunities?searchTerm=${encodeURIComponent(c.sponsor)}`;
              
              const isExpired = c.status === "Expired";
              const isUpcoming = c.status === "Upcoming";

              return (
                <div
                  key={c.id}
                  className={`group flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-lg transition-all hover:shadow-xl space-y-4 ${
                    isExpired
                      ? "border-slate-200 bg-slate-50/50 opacity-80 hover:opacity-100"
                      : "border-slate-200 hover:border-[#5850ec]/40"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-purple-700 border border-purple-200 font-bold text-[10px]">
                        {c.category}
                      </span>
                      
                      {/* Dynamic Status Badges */}
                      {isExpired ? (
                        <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-rose-700 font-bold border border-rose-200 text-[10px]">
                          Expired / Closed
                        </span>
                      ) : isUpcoming ? (
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-indigo-700 font-bold border border-indigo-200 text-[10px]">
                          Upcoming Launch
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-700 font-bold border border-emerald-200 text-[10px]">
                          Registration Open
                        </span>
                      )}
                    </div>

                    <h3 className={`font-['Outfit'] font-bold transition-colors text-xl leading-snug ${
                      isExpired ? "text-slate-700" : "text-slate-900 group-hover:text-[#5850ec]"
                    }`}>
                      {c.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {c.description}
                    </p>

                    <div className={`grid grid-cols-2 gap-3 rounded-2xl border p-3 text-xs ${
                      isExpired ? "bg-slate-100 border-slate-200/80" : "bg-[#F8FAFC] border-slate-100"
                    }`}>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Prize Pool & Perks</span>
                        <span className={`font-bold ${isExpired ? "text-slate-600" : "text-[#5850ec]"}`}>{c.prize}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Deadline</span>
                        <span className={`font-bold ${isExpired ? "text-rose-600" : "text-slate-900"}`}>{c.deadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                    <span className="text-slate-500">Sponsor: <strong className="text-slate-900">{c.sponsor}</strong></span>
                    <a
                      href={compLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 font-bold ${
                        isExpired
                          ? "text-slate-500 hover:text-slate-800 hover:underline"
                          : "text-[#5850ec] hover:underline"
                      }`}
                    >
                      <span>{isExpired ? "View Past Brief" : "Register on Unstop"}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
