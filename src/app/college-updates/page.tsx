"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { getHarmonyStore, AnnouncementItem } from "@/lib/adminStore";

export default function CollegeUpdatesPage() {
  const [updates, setUpdates] = useState<AnnouncementItem[]>([]);

  useEffect(() => {
    const store = getHarmonyStore();
    setUpdates(store.announcements);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-3.5 py-1 font-mono text-xs font-semibold text-blue-700">
          <Bell className="h-3.5 w-3.5 text-blue-600" />
          <span>Campus Notice Board</span>
        </div>
        <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
          GLIM College Updates
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Official GLIM Gurgaon announcements, academic deadlines, and placement office notifications relevant to HR specialization students.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl">
        {updates.map((u) => (
          <div
            key={u.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-2"
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
          </div>
        ))}
      </div>
    </div>
  );
}
