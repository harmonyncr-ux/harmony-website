"use client";

import { FileText, Download, CheckCircle, Zap, ExternalLink } from "lucide-react";
import { useHarmonyStore } from "@/lib/adminStore";

export default function CvResourcesPage() {
  const { store, loading } = useHarmonyStore();
  const templates = store.cvTemplates || [];

  const handleDownload = (docUrl?: string, title?: string) => {
    if (docUrl && docUrl.trim() !== "") {
      window.open(docUrl, "_blank");
    } else {
      alert(`Preparing template download for "${title}". Upload custom CV template in /admin to set live link.`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 bg-[#f8fafc]">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-3.5 py-1 font-mono text-xs font-semibold text-blue-700">
          <FileText className="h-3.5 w-3.5 text-blue-600" />
          <span>Resume Optimization Vault</span>
        </div>
        <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
          CV Resources & Recruiter Guide
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Craft an executive-grade HR resume. Proven bullet point formulas, ATS keyword optimization strategies, and domain-specific templates vetted by corporate recruiters.
        </p>
      </div>

      {/* Bullet Formula Section */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#5850ec] uppercase tracking-wider">
          <Zap className="h-4 w-4" />
          <span>The Golden HR Bullet Formula</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 font-mono text-sm text-slate-900">
          <span className="text-[#5850ec] font-bold">[Power HR Action Verb]</span> + <span className="text-blue-600 font-semibold">[Context / Scale of Initiative]</span> + <span className="text-emerald-600 font-bold">[Quantified Business / People Metric]</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Example:</strong> &ldquo;<em>Spearheaded</em> 360-degree appraisal overhaul across 1,200 engineering staff, <em>reducing annual appraisal cycle time by 40%</em> and <em>improving employee survey satisfaction by 18 points</em>.&rdquo;
        </p>
      </div>

      {/* Templates Grid */}
      <div className="space-y-6">
        <h2 className="font-['Outfit'] text-2xl font-bold text-slate-900">
          Domain-Specific Resume Templates
        </h2>

        {loading ? (
          <div className="py-12 text-center text-sm font-mono text-slate-400">Loading CV templates...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <div
                key={t.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4 hover:border-[#5850ec]/40 transition-all"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-[#5850ec] font-bold uppercase tracking-wider block">
                    {t.type}
                  </span>
                  <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.description}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-600 pt-2">
                    {t.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleDownload(t.docUrl, t.title)}
                  className="flex items-center justify-center gap-2 rounded-full bg-slate-900 py-2.5 text-xs font-semibold text-white hover:bg-[#5850ec] transition-colors"
                >
                  {t.docUrl ? <ExternalLink className="h-3.5 w-3.5 text-white" /> : <Download className="h-3.5 w-3.5 text-white" />}
                  <span>{t.docUrl ? "View / Download Template" : "Download Template (.docx)"}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
