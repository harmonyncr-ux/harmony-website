import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export interface LiveNewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  category: string;
  summary: string;
  readTime: string;
  link: string;
  thumbnail?: string;
}

function cleanHtmlText(raw: string): string {
  if (!raw) return "";
  let str = raw.replace(/<!\[CDATA\[/gi, "").replace(/\]\]>/gi, "");
  for (let i = 0; i < 2; i++) {
    str = str
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ");
  }
  str = str.replace(/<[^>]+>/g, " ");
  str = str.replace(/a\s+href="[^"]*"/gi, "");
  str = str.replace(/https?:\/\/\S+/gi, "");
  str = str.replace(/target="_blank"/gi, "");
  str = str.replace(/\s+/g, " ").trim();
  return str;
}

function extractImageUrl(itemXml: string): string | undefined {
  // Try media:content or media:thumbnail url attribute
  const mediaMatch = itemXml.match(/<(?:media:content|media:thumbnail|enclosure)[^>]+url=["'](https?:\/\/[^"']+)["']/i);
  if (mediaMatch) return mediaMatch[1];

  // Try img tag src attribute
  const imgMatch = itemXml.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  // Try any image url in the item XML (e.g. Economic Times photo links or Livemint img links)
  const genericImgMatch = itemXml.match(/["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp|gif)(?:\?[^"']*)?)["']/i) ||
                          itemXml.match(/["'](https?:\/\/img\.etimg\.com\/photo\/[^"']+)["']/i);
  if (genericImgMatch) return genericImgMatch[1];

  return undefined;
}

/**
 * Follow a Google News redirect URL to discover the real article URL.
 * Uses HEAD with redirect: "manual" to read the Location header without
 * downloading the full page.  Falls back to the original URL on failure.
 */
async function resolveGoogleNewsUrl(gnUrl: string): Promise<string> {
  if (!gnUrl.includes("news.google.com")) return gnUrl;
  try {
    const res = await fetch(gnUrl, {
      method: "HEAD",
      redirect: "manual",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      signal: AbortSignal.timeout(5000),
    });
    const loc = res.headers.get("location");
    if (loc && loc.startsWith("http")) return loc;

    // Some Google News URLs respond with 200 and a meta-refresh or JS redirect.
    // In that case, try a GET and look for a redirect in the body.
    const getRes = await fetch(gnUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      signal: AbortSignal.timeout(5000),
    });
    const finalUrl = getRes.url;
    if (finalUrl && !finalUrl.includes("news.google.com")) return finalUrl;
  } catch {
    // Fall through — return original
  }
  return gnUrl;
}

/**
 * Fetch og:image from a resolved article URL.
 * Downloads only the first 50 KB of HTML to keep it fast.
 */
async function fetchOgImage(articleUrl: string): Promise<string | undefined> {
  try {
    const res = await fetch(articleUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return undefined;

    // Read only head portion (limit to 50 KB)
    const reader = res.body?.getReader();
    if (!reader) return undefined;

    let html = "";
    const decoder = new TextDecoder();
    while (html.length < 50_000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
    }
    reader.cancel();

    // Look for og:image meta tag
    const ogMatch = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    );
    if (ogMatch) return ogMatch[1];

    // Try reverse attribute order (content before property)
    const ogMatch2 = html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
    );
    if (ogMatch2) return ogMatch2[1];

    // Try twitter:image as fallback
    const twMatch = html.match(
      /<meta[^>]+(?:name|property)=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
    );
    if (twMatch) return twMatch[1];

    return undefined;
  } catch {
    return undefined;
  }
}

function formatRelativeDate(pubDate: Date): string {
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - pubDate.getTime()) / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

function autoCategorize(title: string, summary: string): string {
  const combined = (title + " " + summary).toLowerCase();
  if (combined.match(/law|code|compliance|policy|statutory|labor|labour|regulation|govt|supreme court|pf|epfo/)) {
    return "Labor Laws & Policy";
  }
  if (combined.match(/tech|ai|workday|software|automation|analytics|digital|tool|chatgpt|llm/)) {
    return "HR Tech & AI";
  }
  if (combined.match(/comp|salary|pay|bonus|reward|hike|appraisal|benefit|perk|ctc|variable/)) {
    return "Rewards & Comp";
  }
  if (combined.match(/hiring|recruitment|talent|acquisition|onboarding|interview|job|layoff/)) {
    return "Talent Acquisition";
  }
  if (combined.match(/diversity|inclusion|dei|gender|women|equity/)) {
    return "DEI & Inclusion";
  }
  if (combined.match(/learn|train|develop|upskill|reskill|l&d|education/)) {
    return "Learning & Development";
  }
  return "Workplace Strategy";
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 35));
  return `${minutes} min read`;
}



export async function GET() {
  try {
    const rssUrls = [
      "https://economictimes.indiatimes.com/jobs/rssfeeds/107115.cms",
      "https://www.livemint.com/rss/companies",
      "https://news.google.com/rss/search?q=human+resources+HR+India+when:5d&hl=en-IN&gl=IN&ceid=IN:en",
    ];

    interface RawNewsItem {
      title: string;
      source: string;
      date: string;
      category: string;
      summary: string;
      readTime: string;
      rawLink: string;
      rssThumb?: string;
      pubTime: number;
    }

    const rawItems: RawNewsItem[] = [];
    const seenTitles = new Set<string>();
    const now = Date.now();
    const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

    for (const rssUrl of rssUrls) {
      try {
        const response = await fetch(rssUrl, {
          next: { revalidate: 900 }, // 15 min cache
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });

        if (!response.ok) continue;
        const xmlText = await response.text();
        const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/g) || [];

        for (const itemXml of itemMatches) {
          let rawPubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || "";
          rawPubDate = rawPubDate.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
          const pubDateObj = new Date(rawPubDate);

          if (isNaN(pubDateObj.getTime())) continue;
          const ageMs = now - pubDateObj.getTime();
          if (ageMs > FIVE_DAYS_MS || ageMs < 0) continue;

          let rawLink = (itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1] || "").trim();
          rawLink = rawLink.replace(/<!\[CDATA\[|\]\]>/g, "").trim();

          const rawTitle = itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";
          const rawDescription = itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1] || "";
          const rawSource = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] || "";

          let titleClean = cleanHtmlText(rawTitle);
          let sourceClean = cleanHtmlText(rawSource);

          // Deduplicate by title
          if (!titleClean || seenTitles.has(titleClean.toLowerCase())) continue;
          seenTitles.add(titleClean.toLowerCase());

          if (!sourceClean && titleClean.includes(" - ")) {
            const parts = titleClean.split(" - ");
            sourceClean = parts.pop() || "HR Industry";
            titleClean = parts.join(" - ");
          }

          if (!sourceClean || sourceClean === "Business News") {
            if (rawLink.includes("economictimes.indiatimes.com")) sourceClean = "Economic Times HR";
            else if (rawLink.includes("livemint.com")) sourceClean = "Livemint";
            else if (rawLink.includes("financialexpress.com")) sourceClean = "Financial Express";
            else if (rawLink.includes("peoplematters.in")) sourceClean = "People Matters";
            else sourceClean = "Business News";
          }

          let summaryClean = cleanHtmlText(rawDescription);
          if (!summaryClean || summaryClean.length < 15) {
            summaryClean = `Key developments in ${autoCategorize(titleClean, "").toLowerCase()} regarding ${titleClean}.`;
          }

          const rssThumb = extractImageUrl(itemXml);
          const category = autoCategorize(titleClean, summaryClean);

          rawItems.push({
            title: titleClean,
            source: sourceClean,
            date: formatRelativeDate(pubDateObj),
            category,
            summary: summaryClean.length > 180 ? summaryClean.slice(0, 175) + "..." : summaryClean,
            readTime: estimateReadTime(summaryClean),
            rawLink,
            rssThumb,
            pubTime: pubDateObj.getTime(),
          });

          if (rawItems.length >= 6) break;
        }
      } catch {
        // Continue to next feed
      }
      if (rawItems.length >= 6) break;
    }

    // Resolve all Google News redirects + og:images in parallel
    const enriched = await Promise.all(
      rawItems.map(async (raw) => {
        const resolvedLink = await resolveGoogleNewsUrl(raw.rawLink);
        let thumbnail = raw.rssThumb;
        if (!thumbnail && resolvedLink && resolvedLink.startsWith("http")) {
          thumbnail = await fetchOgImage(resolvedLink);
        }
        return {
          id: `live-news-${rawItems.indexOf(raw)}-${raw.pubTime}`,
          title: raw.title,
          source: raw.source,
          date: raw.date,
          category: raw.category,
          summary: raw.summary,
          readTime: raw.readTime,
          link: resolvedLink,
          thumbnail,
        } as LiveNewsItem;
      })
    );

    const items = enriched;

    return NextResponse.json({
      success: true,
      source: "Google News RSS (Live)",
      lastUpdated: new Date().toISOString(),
      count: items.length,
      items,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage, items: [] },
      { status: 500 }
    );
  }
}
