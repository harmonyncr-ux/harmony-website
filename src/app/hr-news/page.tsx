"use client";

import { useState, useEffect, useCallback } from "react";
import { Newspaper, ExternalLink, Clock, RefreshCw, Radio } from "lucide-react";
import { getHarmonyStore, HrNewsItem } from "@/lib/adminStore";

// Category → gradient mapping for placeholder thumbnails
const categoryGradients: Record<string, string> = {
  "Labor Laws & Policy": "from-amber-500 to-orange-600",
  "HR Tech & AI": "from-violet-500 to-purple-600",
  "Rewards & Comp": "from-emerald-500 to-teal-600",
  "Talent Acquisition": "from-blue-500 to-indigo-600",
  "DEI & Inclusion": "from-pink-500 to-rose-600",
  "Learning & Development": "from-cyan-500 to-blue-600",
  "Workplace Strategy": "from-slate-500 to-slate-700",
};

// Category → icon emoji for gradient thumbnails
const categoryIcons: Record<string, string> = {
  "Labor Laws & Policy": "⚖️",
  "HR Tech & AI": "🤖",
  "Rewards & Comp": "💰",
  "Talent Acquisition": "🎯",
  "DEI & Inclusion": "🌍",
  "Learning & Development": "📚",
  "Workplace Strategy": "🏢",
};

// Category → High quality Unsplash preview image mapping
const categoryDefaultImages: Record<string, string> = {
  "Labor Laws & Policy": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  "HR Tech & AI": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "Rewards & Comp": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  "Talent Acquisition": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
  "DEI & Inclusion": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  "Learning & Development": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
  "Workplace Strategy": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
};

interface NewsItemWithThumb extends HrNewsItem {
  thumbnail?: string;
}

export default function HrNewsPage() {
  const [newsList, setNewsList] = useState<NewsItemWithThumb[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchLiveNews = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/hr-news");
      const store = getHarmonyStore();
      const fallbackItems = store.hrNews || [];

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.items) && data.items.length > 0) {
          const combined = [...data.items];
          for (const item of fallbackItems) {
            if (combined.length >= 6) break;
            if (!combined.some((i: NewsItemWithThumb) => i.title === item.title)) {
              combined.push(item);
            }
          }
          setNewsList(combined.slice(0, 6));
          setIsLive(true);
        } else {
          setNewsList(fallbackItems.slice(0, 6));
          setIsLive(false);
        }
      } else {
        setNewsList(fallbackItems.slice(0, 6));
        setIsLive(false);
      }
    } catch {
      const store = getHarmonyStore();
      setNewsList((store.hrNews || []).slice(0, 6));
      setIsLive(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveNews();
  }, [fetchLiveNews]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 bg-[#f8fafc]">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-50 px-3.5 py-1 text-xs font-semibold text-purple-700">
            <Newspaper className="h-3.5 w-3.5 text-purple-600" />
            <span>Regulatory & Market Intelligence Beat</span>
          </div>

          {isLive && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <Radio className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
              <span>Live Automated Feed</span>
            </div>
          )}
        </div>

        <h1 className="font-['Outfit'] text-4xl font-extrabold text-slate-900 sm:text-5xl">
          HR News Portal
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Real-time automated HR intelligence — labor code revisions, total rewards policies, hiring trends, and workplace technology updates. Auto-refreshes every 15 minutes.
        </p>
      </div>

      {/* News Feed Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <h2 className="font-['Outfit'] text-2xl font-bold text-slate-900">
            Latest Live Updates
          </h2>

          <button
            onClick={fetchLiveNews}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-[#5850ec]/40 hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#5850ec] ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>

        {loading ? (
          /* Loading Skeletons */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="rounded-3xl border border-slate-200 bg-white shadow-md animate-pulse overflow-hidden">
                <div className="h-40 bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-24 bg-slate-200 rounded-full" />
                  <div className="h-5 w-full bg-slate-200 rounded-lg" />
                  <div className="h-10 w-full bg-slate-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* News Cards Grid — 6 articles with real preview images */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsList.map((item) => {
              const defaultImage = categoryDefaultImages[item.category] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80";
              const imageUrl = (item.thumbnail && item.thumbnail.startsWith("http")) ? item.thumbnail : defaultImage;
              const articleLink = (item.link && item.link.trim() !== "" && item.link !== "#") 
                ? item.link 
                : `https://news.google.com/search?q=${encodeURIComponent(item.title)}`;

              return (
                <a
                  key={item.id}
                  href={articleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden hover:border-[#5850ec]/40 hover:shadow-xl transition-all"
                >
                  {/* Real Article Preview Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to high quality category image if link breaks
                        const target = e.currentTarget;
                        if (target.src !== defaultImage) {
                          target.src = defaultImage;
                        }
                      }}
                    />

                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-slate-800 shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-['Outfit'] text-base font-bold text-slate-900 group-hover:text-[#5850ec] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {item.readTime}
                      </span>

                      <span className="flex items-center gap-1.5 font-semibold text-slate-600 group-hover:text-[#5850ec] transition-colors">
                        <span>{item.source}</span>
                        <ExternalLink className="h-3 w-3 text-[#5850ec]" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
