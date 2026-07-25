import { NextResponse } from "next/server";

export interface LiveCaseComp {
  id: string;
  title: string;
  sponsor: string;
  prize: string;
  deadline: string;
  status: string;
  category: string;
  description: string;
  featured?: boolean;
  link: string;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDeadline(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" });
  } catch {
    return "See Unstop";
  }
}

function extractPrize(prizes: Array<{ cash?: number | null; others?: string | null }>): string {
  if (!prizes || prizes.length === 0) return "Exciting Prizes";
  for (const p of prizes) {
    if (p.cash && p.cash > 0) {
      return `₹${p.cash.toLocaleString("en-IN")}+`;
    }
    if (p.others) {
      const clean = stripHtml(p.others);
      return clean.length > 60 ? clean.slice(0, 57) + "..." : clean;
    }
  }
  return "Certificates + Prizes";
}

function detectCategory(title: string, details: string): string {
  const text = (title + " " + details).toLowerCase();
  if (text.includes("hr") || text.includes("people") || text.includes("talent") || text.includes("human resource")) {
    return "HR & Talent Management";
  }
  if (text.includes("case study") || text.includes("case competition") || text.includes("b-school")) {
    return "Case Study & Strategy";
  }
  if (text.includes("analytics") || text.includes("data") || text.includes("ai") || text.includes("machine learning")) {
    return "Analytics & AI";
  }
  if (text.includes("marketing") || text.includes("brand")) {
    return "Marketing & Branding";
  }
  if (text.includes("finance") || text.includes("fintech") || text.includes("trading")) {
    return "Finance & Fintech";
  }
  if (text.includes("quiz") || text.includes("olympiad")) {
    return "Quiz & Knowledge";
  }
  if (text.includes("hack") || text.includes("code") || text.includes("tech")) {
    return "Tech & Innovation";
  }
  if (text.includes("consulting") || text.includes("strategy")) {
    return "Consulting & Strategy";
  }
  return "General Management";
}

export async function GET() {
  try {
    // Fetch REAL live competitions from Unstop's public API
    const apiUrl =
      "https://unstop.com/api/public/opportunity/search-new?opportunity=competitions&per_page=15&oppstatus=open&sort=recency";

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Unstop API unavailable", items: [] },
        { status: 502 }
      );
    }

    const json = await response.json();
    const rawItems = json?.data?.data;

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "No competitions found", items: [] },
        { status: 200 }
      );
    }

    const items: LiveCaseComp[] = [];

    for (const item of rawItems) {
      if (items.length >= 10) break;

      const title = item.title || "";
      const orgName = item.organisation?.name || "Unstop";
      const publicUrl = item.public_url || "";
      const directLink = `https://unstop.com/${publicUrl}`;
      const details = stripHtml(item.details || "");
      const description = details.length > 150 ? details.slice(0, 147) + "..." : details;
      const regEnd = item.regnRequirements?.end_regn_dt || item.end_date || "";
      const deadline = formatDeadline(regEnd);
      const remainDays = item.regnRequirements?.remain_days || "Registration Open";
      const prize = extractPrize(item.prizes || []);
      const category = detectCategory(title, details);
      const registerCount = item.registerCount || 0;

      items.push({
        id: `unstop-${item.id}`,
        title,
        sponsor: orgName,
        prize,
        deadline: `${deadline} (${remainDays})`,
        status: "Registration Open",
        category,
        description,
        featured: items.length < 3,
        link: directLink,
      });
    }

    return NextResponse.json({
      success: true,
      source: "Unstop Live API",
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
