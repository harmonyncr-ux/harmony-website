"use client";

import { Mail, Download, ExternalLink } from "lucide-react";
import { useHarmonyStore } from "@/lib/adminStore";

export default function NewsletterPage() {
  const { store, loading } = useHarmonyStore();
  const newsletters = store.newsletters || [];

  const handleDownload = (pdfUrl?: string, title?: string) => {
    if (pdfUrl && pdfUrl.trim() !== "") {
      window.open(pdfUrl, "_blank");
    } else {
      alert(`Preparing sample download for "${title}". Upload custom PDF in /admin to set live link.`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#5850ec]/30 bg-[#EEF2FF] px-3.5 py-1 font-mono text-xs font-semibold text-[#5850ec]">
          <Mail className="h-3.5 w-3.5 text-[#5850ec]" />
          <span>Editorial Archive</span>
        </div>
        <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Newsletter Archive
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Access past monthly editions of Harmony — GLIM&apos;s flagship HR magazine covering strategic labor trends, alumni spotlights, case analyses, and campus highlights.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm font-mono text-slate-400">Loading newsletter archive...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {newsletters.map((n) => (
            <div
              key={n.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="rounded-full bg-[#EEF2FF] px-2.5 py-0.5 font-bold text-[#5850ec]">
                    {n.edition}
                  </span>
                  <span>{n.size}</span>
                </div>
                <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  {n.title}
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {n.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5850ec]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleDownload(n.pdfUrl, n.title)}
                className="flex items-center justify-center gap-2 rounded-full bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-[#5850ec] transition-colors"
              >
                {n.pdfUrl ? <ExternalLink className="h-3.5 w-3.5 text-white" /> : <Download className="h-3.5 w-3.5 text-white" />}
                <span>{n.pdfUrl ? "View / Download PDF" : "Download Newsletter (.pdf)"}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
