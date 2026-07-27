"use client";

import { motion } from "motion/react";
import { Mail, Download, ExternalLink } from "lucide-react";
import { useHarmonyStore } from "@/lib/adminStore";
import {
  AnimatedSection,
  AnimatedBadge,
  AnimatedHeading,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

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
      {/* Header — staggered entrance */}
      <div className="space-y-4 max-w-3xl">
        <AnimatedBadge>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5850ec]/30 bg-[#EEF2FF] px-3.5 py-1 font-mono text-xs font-semibold text-[#5850ec]">
            <Mail className="h-3.5 w-3.5 text-[#5850ec]" />
            <span>Editorial Archive</span>
          </div>
        </AnimatedBadge>
        <AnimatedHeading delay={0.1}>
          <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Newsletter Archive
          </h1>
        </AnimatedHeading>
        <AnimatedSection delay={0.2}>
          <p className="text-base text-slate-600 leading-relaxed">
            Access past monthly editions of Harmony — GLIM&apos;s flagship HR magazine covering strategic labor trends, alumni spotlights, case analyses, and campus highlights.
          </p>
        </AnimatedSection>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm font-mono text-slate-400">Loading newsletter archive...</div>
      ) : (
        /* Newsletter Cards Grid — Equal Height Items */
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 items-stretch" stagger={0.1}>
          {newsletters.map((n) => (
            <StaggerItem key={n.id} className="h-full flex">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col justify-between w-full h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-4 hover:border-[#5850ec]/40 transition-all text-left"
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
                        <span className="h-1.5 w-1.5 rounded-full bg-[#5850ec] shrink-0" />
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
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
