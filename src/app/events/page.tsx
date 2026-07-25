"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, ArrowUpRight } from "lucide-react";
import { getHarmonyStore, EventItem } from "@/lib/adminStore";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const store = getHarmonyStore();
    setEvents(store.events);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1 font-mono text-xs font-semibold text-emerald-700">
          <Calendar className="h-3.5 w-3.5 text-emerald-600" />
          <span>Campus Calendar</span>
        </div>
        <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Events & Keynote Workshops
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Stay connected with upcoming workshops, guest leadership keynotes, and placement mock interviews hosted by Harmony HR Club at GLIM Gurgaon.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {events.map((e) => (
          <div
            key={e.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-700 font-bold border border-emerald-200">
                  {e.category}
                </span>
                <span>{e.date}</span>
              </div>
              <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                {e.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {e.description}
              </p>
              <div className="space-y-1.5 text-xs text-slate-600 font-mono pt-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#5850ec]" />
                  <span>{e.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#5850ec]" />
                  <span>{e.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-[#5850ec]" />
                  <span>Speaker: {e.speaker}</span>
                </div>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-full bg-[#5850ec] py-2.5 text-xs font-bold text-white hover:bg-[#4b44dc] transition-colors">
              <span>Register for Event</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
