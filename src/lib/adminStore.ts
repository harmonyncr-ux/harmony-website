"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

export interface AlumniItem {
  id: string;
  name: string;
  role: string;
  batch: string;
  company: string;
  location: string;
  focusArea: string;
  email: string;
  linkedin: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  speaker: string;
  description: string;
  status: "Upcoming" | "Completed" | "Registration Open";
  link?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  category: "Academics" | "Placements" | "Competitions" | "General";
  content: string;
}

export interface VaultCaseItem {
  id: string;
  date: string;
  title: string;
  topic: string;
  difficulty: string;
  summary: string;
  responses: number;
}

export interface NewsletterItem {
  id: string;
  edition: string;
  title: string;
  date: string;
  size: string;
  highlights: string[];
  pdfUrl?: string;
}

export interface CaseCompItem {
  id: string;
  title: string;
  sponsor: string;
  prize: string;
  deadline: string;
  status: string;
  category: string;
  description: string;
  featured?: boolean;
  link?: string;
}

export interface CvResourceItem {
  id: string;
  title: string;
  type: string;
  description: string;
  bullets: string[];
  docUrl?: string;
}

export interface HrNewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  category: string;
  summary: string;
  readTime: string;
  link?: string;
  thumbnail?: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  batch: string;
  focus: string;
  email: string;
  linkedin?: string;
}

export interface FacultyAdvisor {
  name: string;
  role: string;
  department: string;
  institution: string;
  bio: string;
}

export interface HarmonyDataStore {
  alumni: AlumniItem[];
  events: EventItem[];
  announcements: AnnouncementItem[];
  vaultCases: VaultCaseItem[];
  newsletters: NewsletterItem[];
  caseComps: CaseCompItem[];
  cvTemplates: CvResourceItem[];
  hrNews: HrNewsItem[];
  teamMembers: TeamMemberItem[];
  facultyAdvisor: FacultyAdvisor;
}

export const initialData: HarmonyDataStore = {
  alumni: [
    {
      id: "alum-1",
      name: "Ananya Sharma",
      role: "Senior HR Business Partner",
      batch: "PGPM Class of 2022",
      company: "Amazon India",
      location: "Bengaluru",
      focusArea: "Talent Management & Org Design",
      email: "ananya.s@greatlakes.edu.in",
      linkedin: "https://linkedin.com",
    },
    {
      id: "alum-2",
      name: "Rohan Varma",
      role: "Lead People Analytics Specialist",
      batch: "PGPM Class of 2021",
      company: "Deloitte Consulting",
      location: "Gurgaon",
      focusArea: "Workforce Planning & SQL/Python",
      email: "rohan.v@greatlakes.edu.in",
      linkedin: "https://linkedin.com",
    },
    {
      id: "alum-3",
      name: "Pooja Hegde",
      role: "Compensation & Benefits Manager",
      batch: "PGPM Class of 2023",
      company: "Asian Paints",
      location: "Mumbai",
      focusArea: "Executive Rewards & Variable Pay",
      email: "pooja.h@greatlakes.edu.in",
      linkedin: "https://linkedin.com",
    },
    {
      id: "alum-4",
      name: "Karan Malhotra",
      role: "Global Talent Acquisition Lead",
      batch: "PGPM Class of 2020",
      company: "Flipkart",
      location: "Bengaluru",
      focusArea: "Tech Hiring & Employer Branding",
      email: "karan.m@greatlakes.edu.in",
      linkedin: "https://linkedin.com",
    },
  ],
  events: [
    {
      id: "evt-1",
      title: "HR Tech & Workday Masterclass with CHRO Panel",
      date: "August 12, 2026",
      time: "4:00 PM – 6:30 PM",
      venue: "GLIM Auditorium & Online Stream",
      category: "Keynote & Workshop",
      speaker: "Head of People Operations, Capgemini India",
      description: "Hands-on breakdown of enterprise HR software implementation, workforce planning analytics, and candidate experience design.",
      status: "Registration Open",
    },
    {
      id: "evt-2",
      title: "Mock HR Case Interview Marathon",
      date: "August 20, 2026",
      time: "10:00 AM – 5:00 PM",
      venue: "Syndicate Rooms 1–6",
      category: "Placement Practice",
      speaker: "Senior HR Alumni (Batches '21–'24)",
      description: "1-on-1 simulated case interviews with instant rubric feedback and resume review sessions for final year students.",
      status: "Upcoming",
    },
  ],
  announcements: [
    {
      id: "ann-1",
      title: "Summer Internship Project (SIP) Viva Schedule Released",
      date: "July 24, 2026",
      category: "Academics",
      content: "The academic office has published the final SIP viva evaluation schedule for HR specialization students. All project reports must be uploaded to Moodle by 11:59 PM.",
    },
    {
      id: "ann-2",
      title: "Pre-Placement Talks (PPT) Schedule — Corporate HR Track",
      date: "July 22, 2026",
      category: "Placements",
      content: "Placement office PPT sessions kick off next week with visits from Accenture Strategy, Asian Paints, and Amazon. Check your student portal for venue assignments.",
    },
  ],
  vaultCases: [
    {
      id: "case-041",
      date: "July 22, 2026",
      title: "The Remote Compensation Differential Conundrum",
      topic: "Rewards & Comp",
      difficulty: "Mid-level",
      summary: "Should employees relocating to low-cost tier-2 cities maintain metro salary levels? Engineering demands parity; Finance insists on geo-discounting.",
      responses: 38,
    },
    {
      id: "case-040",
      date: "July 21, 2026",
      title: "Whistleblower vs. High-Revenue Enterprise Lead",
      topic: "Ethics & Compliance",
      difficulty: "Executive",
      summary: "A junior analyst reports verbal harassment by the top sales Director bringing in 40% of Q2 revenue. The VP requests internal settlement without formal record.",
      responses: 44,
    },
    {
      id: "case-039",
      date: "July 20, 2026",
      title: "The Quiet Quitting Counter-Offer Strategy",
      topic: "Employee Engagement",
      difficulty: "HRBP Dilemma",
      summary: "A critical DevOps engineer submits resignation after 6 months of minimal engagement. Counter-offering 35% pay raise pisses off existing loyal team members.",
      responses: 29,
    },
  ],
  newsletters: [
    {
      id: "nl-1",
      edition: "July 2026 Edition",
      title: "Navigating the New Labor Codes & AI Appraisals",
      date: "July 2026",
      size: "2.4 MB PDF",
      highlights: ["Deep-dive into 2026 Labor Code revisions", "Alumni Interview with Amazon HRBP Lead", "Student Case Comps Winner Spotlight"],
    },
    {
      id: "nl-2",
      edition: "June 2026 Edition",
      title: "Total Rewards Re-imagined: Comp & Benefits in High Inflation",
      date: "June 2026",
      size: "3.1 MB PDF",
      highlights: ["Equity vesting models in tech startups", "Mental health stipends benchmark", "GLIM Placement Preparation Checklist"],
    },
  ],
  caseComps: [
    {
      id: "cc-1",
      title: "Tata Steel SHiFT - Steel House Ideation Challenge",
      sponsor: "Tata Steel",
      prize: "₹500,000 + PPI Roles",
      deadline: "August 15, 2026",
      status: "Registration Open",
      category: "HR Strategy & Industrial Relations",
      description: "Design a sustainable workforce transition model for decarbonized steel manufacturing plants across India.",
      featured: true,
      link: "https://unstop.com/all-opportunities?searchTerm=Tata%20Steel%20SHiFT",
    },
    {
      id: "cc-2",
      title: "TVS Credit E.P.I.C Season 6 - Analytics & Strategy Challenge",
      sponsor: "TVS Credit",
      prize: "₹300,000 + Pre-Placement Interviews",
      deadline: "August 28, 2026",
      status: "Registration Open",
      category: "People Analytics & Fintech HR",
      description: "Build an attrition predictive machine learning model combined with retention intervention policy frameworks.",
      featured: true,
      link: "https://unstop.com/all-opportunities?searchTerm=TVS%20Credit%20EPIC",
    },
    {
      id: "cc-3",
      title: "Mahindra Rise HR & Operations Leadership League",
      sponsor: "Mahindra & Mahindra",
      prize: "₹400,000 + National Trophy",
      deadline: "September 10, 2026",
      status: "Upcoming",
      category: "Diversity & Leadership Development",
      description: "Formulate an inclusive hiring and mentorship roadmap for women in manufacturing and EV engineering roles.",
      featured: false,
      link: "https://unstop.com/all-opportunities?searchTerm=Mahindra%20Rise",
    },
    {
      id: "cc-4",
      title: "Hindustan Unilever L.I.M.E Season 17 (HR Track)",
      sponsor: "Hindustan Unilever",
      prize: "₹1,000,000 + PPO Offers",
      deadline: "August 30, 2026",
      status: "Registration Open",
      category: "FMCG HR Operations & Culture",
      description: "Solve real-world workforce engagement and supply chain talent retention challenges across HUL's Indian manufacturing units.",
      featured: true,
      link: "https://unstop.com/all-opportunities?searchTerm=HUL%20LIME",
    },
    {
      id: "cc-5",
      title: "L'Oréal Brandstorm 2026 Innovation Challenge",
      sponsor: "L'Oréal India",
      prize: "₹500,000 + International Final",
      deadline: "September 05, 2026",
      status: "Registration Open",
      category: "Employer Branding & DEI",
      description: "Reinvent candidate experience and Gen-Z talent acquisition strategies using AI avatar screeners and gaming dynamics.",
      featured: false,
      link: "https://unstop.com/all-opportunities?searchTerm=Loreal%20Brandstorm",
    },
    {
      id: "cc-6",
      title: "Reliance TUP Season 10 - The Ultimate Pitch",
      sponsor: "Reliance Industries",
      prize: "₹600,000 + Pre-Placement Interviews",
      deadline: "September 18, 2026",
      status: "Upcoming",
      category: "Org Structure & Tech Transformation",
      description: "Propose scalable organization restructuring strategies for rapid gig-economy workforce onboarding in Telecom & Retail.",
      featured: false,
      link: "https://unstop.com/all-opportunities?searchTerm=Reliance%20TUP",
    },
    {
      id: "cc-7",
      title: "Amazon ACE Challenge 2026 (HR & Ops Track)",
      sponsor: "Amazon India",
      prize: "₹350,000 + Mentorship with VPs",
      deadline: "August 22, 2026",
      status: "Registration Open",
      category: "Warehouse HR & Labor Welfare",
      description: "Optimize peak-season warehouse labor allocation, ergonomic safety compliance, and seasonal worker retention.",
      featured: false,
      link: "https://unstop.com/all-opportunities?searchTerm=Amazon%20ACE",
    },
    {
      id: "cc-8",
      title: "Aditya Birla Group Stratos 2026",
      sponsor: "Aditya Birla Group",
      prize: "₹700,000 + Leadership Trainee Roles",
      deadline: "September 25, 2026",
      status: "Upcoming",
      category: "Executive Rewards & Global HR",
      description: "Design cross-border compensation parity and executive incentive models for ABG's global acquisitions.",
      featured: false,
      link: "https://unstop.com/all-opportunities?searchTerm=Aditya%20Birla%20Stratos",
    },
    {
      id: "cc-9",
      title: "Deloitte Maverick Season 13 - Human Capital Challenge",
      sponsor: "Deloitte India",
      prize: "₹450,000 + PPI Interview Direct Entry",
      deadline: "May 20, 2026 (Closed)",
      status: "Expired",
      category: "Human Capital Consulting",
      description: "Simulate a complete HR transformation consulting pitch for a mid-sized healthcare enterprise scaling to 5,000 employees.",
      featured: false,
      link: "https://unstop.com/all-opportunities?searchTerm=Deloitte%20Maverick",
    },
    {
      id: "cc-10",
      title: "Flipkart Wired Season 9 - Campus Case Challenge",
      sponsor: "Flipkart",
      prize: "₹500,000 + Flipstar PPO Roles",
      deadline: "June 10, 2026 (Closed)",
      status: "Expired",
      category: "E-Commerce Talent Acquisition",
      description: "Design hyper-targeted tech & analytics hiring campaigns to reduce early-stage candidate dropouts.",
      featured: false,
      link: "https://unstop.com/all-opportunities?searchTerm=Flipkart%20Wired",
    },
  ],
  cvTemplates: [
    {
      id: "cv-1",
      title: "Strategic HRBP & Talent Management Track",
      type: "LaTeX & Word Format",
      description: "Tailored for HR Generalist, HR Business Partner, and Leadership Development program interviews.",
      bullets: ["Emphasis on business metric impact (EBIT, turnover reduction)", "STAR formula layout"],
    },
    {
      id: "cv-2",
      title: "People Analytics & HR Tech Track",
      type: "Clean Modern Format",
      description: "Optimized for HR analytics, Workday/SAP SuccessFactors implementation, and workforce planning roles.",
      bullets: ["Highlighting SQL, Python, Tableau, and HRIS tools", "Quantified model accuracy metrics"],
    },
    {
      id: "cv-3",
      title: "Total Rewards & Compensation Track",
      type: "Financial & Quantitative Format",
      description: "Designed for compensation modeling, job evaluation, and benefits restructuring applications.",
      bullets: ["Focus on budget scale, equity plans, and wage benchmark analysis"],
    },
  ],
  hrNews: [
    {
      id: "news-1",
      title: "Ministry of Labour Issues Revised Draft Guidelines on 4-Day Work Week",
      source: "Economic Times HR World",
      date: "July 23, 2026",
      category: "Labor Laws & Policy",
      summary: "Proposed guidelines mandate 12-hour daily shifts to cap total weekly hours at 48 while granting mandatory 3 consecutive rest days. IT and manufacturing sectors debate overtime calculation rules.",
      readTime: "3 min read",
      link: "https://hr.economictimes.indiatimes.com/news/workplace-policy/ministry-of-labour-draft-guidelines-4-day-work-week",
      thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "news-2",
      title: "GCCs in India Surge Retention Efforts with Hybrid Transport Stipends",
      source: "People Matters India",
      date: "July 22, 2026",
      category: "Workplace Strategy",
      summary: "Global Capability Centers (GCCs) in Bengaluru and Gurgaon are introducing flexible 3+2 hybrid models and transportation subsidies to counter attrition caused by strict full-time RTO mandates.",
      readTime: "4 min read",
      link: "https://www.peoplematters.in/article/employee-engagement/gccs-in-india-surge-retention-efforts",
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "news-3",
      title: "AI-Powered Performance Reviews Face Employee Bias Concerns",
      source: "Harvard Business Review",
      date: "July 21, 2026",
      category: "HR Tech & AI",
      summary: "New study reveals 34% of enterprise employees express distrust towards sentiment analysis tools used during mid-year appraisals. Leading HR leaders advocate for human-in-the-loop audit protocols.",
      readTime: "5 min read",
      link: "https://hbr.org/2026/07/ai-performance-reviews-employee-trust",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "news-4",
      title: "IT Majors Shift to Competency-Based Pay Models Amid Hiring Moderation",
      source: "Business Standard",
      date: "July 24, 2026",
      category: "Rewards & Comp",
      summary: "Leading IT service exporters in India are replacing flat annual increments with skill-linked variable incentives, placing premium value on cloud architecture and AI fluency.",
      readTime: "3 min read",
      link: "https://www.business-standard.com/article/companies/it-majors-competency-pay-models",
      thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "news-5",
      title: "EPFO Simplifies Automated Transfer Process for Private Sector Employees",
      source: "Financial Express",
      date: "July 23, 2026",
      category: "Labor Laws & Policy",
      summary: "The Employees' Provident Fund Organisation rolls out auto-transfer functionality for Universal Account Numbers (UAN), reducing job-switch friction and claim settlement timelines.",
      readTime: "4 min read",
      link: "https://www.financialexpress.com/money/epfo-simplifies-automated-transfer-process",
      thumbnail: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "news-6",
      title: "Corporate India Intensifies DEI Benchmarks for Mid-Management Roles",
      source: "Mint HR",
      date: "July 22, 2026",
      category: "DEI & Inclusion",
      summary: "Top Indian conglomerates launch structured returnship programs and female leadership pipelines to address the leaky pipeline at senior manager levels.",
      readTime: "3 min read",
      link: "https://www.livemint.com/news/india/corporate-india-dei-benchmarks-mid-management",
      thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    },
  ],
  teamMembers: [
    {
      id: "tm-1",
      name: "Siddharth Menon",
      role: "President & Student Lead",
      batch: "PGPM Class of 2026",
      focus: "Strategic Initiatives & Recruiter Relations",
      email: "siddharth.m@greatlakes.edu.in",
    },
    {
      id: "tm-2",
      name: "Divya Krishnan",
      role: "Vice President & Vault Lead",
      batch: "PGPM Class of 2026",
      focus: "Daily Dilemma Case Curation & Content Strategy",
      email: "divya.k@greatlakes.edu.in",
    },
    {
      id: "tm-3",
      name: "Arjun Nambiar",
      role: "Head of Corporate & Alumni Relations",
      batch: "PGPM Class of 2026",
      focus: "Alumni Connect & Placement Mentorship Drives",
      email: "arjun.n@greatlakes.edu.in",
    },
    {
      id: "tm-4",
      name: "Meera Sengupta",
      role: "Head of Editorial & Publications",
      batch: "PGPM Class of 2026",
      focus: "Monthly Newsletter Archive & HR News Portal",
      email: "meera.s@greatlakes.edu.in",
    },
  ],
  facultyAdvisor: {
    name: "Dr. Rajesh K. Nair",
    role: "Faculty Advisor & Professor of OB & HR",
    department: "Organizational Behavior & Human Resources",
    institution: "Great Lakes Institute of Management Gurgaon",
    bio: "Over 20 years of research and corporate consulting experience in strategic human resource management, executive leadership development, and change management.",
  },
};

const STORAGE_KEY = "harmony_data_store_v1";

export function getHarmonyStore(): HarmonyDataStore {
  if (typeof window === "undefined") return initialData;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return initialData;
  try {
    const parsed = JSON.parse(saved);
    return { ...initialData, ...parsed };
  } catch {
    return initialData;
  }
}

export function saveHarmonyStore(store: HarmonyDataStore) {
  if (typeof window === "undefined") return;
  // 1. Save to local storage for instant responsiveness
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));

  // 2. Asynchronously sync to Supabase if configured
  if (isSupabaseConfigured && supabase) {
    syncStoreToSupabase(store).catch((err) =>
      console.warn("Supabase sync warning:", err)
    );
  }
}

// ---------------------------------------------------------
// SUPABASE LIVE FETCHING & CLOUD SYNC HELPERS
// ---------------------------------------------------------

export async function fetchHarmonyStoreFromCloud(): Promise<HarmonyDataStore> {
  const localStore = getHarmonyStore();

  if (!isSupabaseConfigured || !supabase) {
    return localStore;
  }

  try {
    const [
      alumniRes,
      eventsRes,
      announcementsRes,
      vaultRes,
      newslettersRes,
      caseCompsRes,
      cvRes,
      hrNewsRes,
      teamRes,
      facultyRes,
    ] = await Promise.all([
      supabase.from("alumni").select("*"),
      supabase.from("events").select("*"),
      supabase.from("announcements").select("*"),
      supabase.from("vault_cases").select("*"),
      supabase.from("newsletters").select("*"),
      supabase.from("case_comps").select("*"),
      supabase.from("cv_templates").select("*"),
      supabase.from("hr_news").select("*"),
      supabase.from("team_members").select("*"),
      supabase.from("faculty_advisor").select("*").eq("id", 1).single(),
    ]);

    const cloudStore: HarmonyDataStore = {
      alumni: alumniRes.data && alumniRes.data.length > 0
        ? alumniRes.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            role: item.role,
            batch: item.batch,
            company: item.company,
            location: item.location,
            focusArea: item.focus_area || item.focusArea,
            email: item.email,
            linkedin: item.linkedin || "",
          }))
        : localStore.alumni,

      events: eventsRes.data && eventsRes.data.length > 0
        ? eventsRes.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            date: item.date,
            time: item.time,
            venue: item.venue,
            category: item.category,
            speaker: item.speaker,
            description: item.description,
            status: item.status,
            link: item.link || "",
          }))
        : localStore.events,

      announcements: announcementsRes.data && announcementsRes.data.length > 0
        ? announcementsRes.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            date: item.date,
            category: item.category,
            content: item.content,
          }))
        : localStore.announcements,

      vaultCases: vaultRes.data && vaultRes.data.length > 0
        ? vaultRes.data.map((item: any) => ({
            id: item.id,
            date: item.date,
            title: item.title,
            topic: item.topic,
            difficulty: item.difficulty,
            summary: item.summary,
            responses: item.responses || 0,
          }))
        : localStore.vaultCases,

      newsletters: newslettersRes.data && newslettersRes.data.length > 0
        ? newslettersRes.data.map((item: any) => ({
            id: item.id,
            edition: item.edition,
            title: item.title,
            date: item.date,
            size: item.size,
            highlights: Array.isArray(item.highlights) ? item.highlights : [],
            pdfUrl: item.pdf_url || item.pdfUrl || "",
          }))
        : localStore.newsletters,

      caseComps: caseCompsRes.data && caseCompsRes.data.length > 0
        ? caseCompsRes.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            sponsor: item.sponsor,
            prize: item.prize,
            deadline: item.deadline,
            status: item.status,
            category: item.category,
            description: item.description,
            featured: Boolean(item.featured),
          }))
        : localStore.caseComps,

      cvTemplates: cvRes.data && cvRes.data.length > 0
        ? cvRes.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            type: item.type,
            description: item.description,
            bullets: Array.isArray(item.bullets) ? item.bullets : [],
            docUrl: item.doc_url || item.docUrl || "",
          }))
        : localStore.cvTemplates,

      hrNews: hrNewsRes.data && hrNewsRes.data.length > 0
        ? hrNewsRes.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            source: item.source,
            date: item.date,
            category: item.category,
            summary: item.summary,
            readTime: item.read_time || item.readTime,
          }))
        : localStore.hrNews,

      teamMembers: teamRes.data && teamRes.data.length > 0
        ? teamRes.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            role: item.role,
            batch: item.batch,
            focus: item.focus,
            email: item.email,
            linkedin: item.linkedin || "",
          }))
        : localStore.teamMembers,

      facultyAdvisor: facultyRes.data
        ? {
            name: facultyRes.data.name,
            role: facultyRes.data.role,
            department: facultyRes.data.department,
            institution: facultyRes.data.institution,
            bio: facultyRes.data.bio,
          }
        : localStore.facultyAdvisor,
    };

    // Update localStorage cache with cloud state
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudStore));
    }

    return cloudStore;
  } catch (error) {
    console.warn("Failed to fetch store from Supabase cloud, returning local store:", error);
    return localStore;
  }
}

async function syncStoreToSupabase(store: HarmonyDataStore) {
  if (!supabase) return;

  // Sync Alumni
  await supabase.from("alumni").upsert(
    store.alumni.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      batch: item.batch,
      company: item.company,
      location: item.location,
      focus_area: item.focusArea,
      email: item.email,
      linkedin: item.linkedin || "",
    }))
  );

  // Sync Events
  await supabase.from("events").upsert(
    store.events.map((item) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      time: item.time,
      venue: item.venue,
      category: item.category,
      speaker: item.speaker,
      description: item.description,
      status: item.status,
      link: item.link || "",
    }))
  );

  // Sync Announcements
  await supabase.from("announcements").upsert(
    store.announcements.map((item) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      category: item.category,
      content: item.content,
    }))
  );

  // Sync Vault Cases
  await supabase.from("vault_cases").upsert(
    store.vaultCases.map((item) => ({
      id: item.id,
      date: item.date,
      title: item.title,
      topic: item.topic,
      difficulty: item.difficulty,
      summary: item.summary,
      responses: item.responses,
    }))
  );

  // Sync Newsletters
  await supabase.from("newsletters").upsert(
    store.newsletters.map((item) => ({
      id: item.id,
      edition: item.edition,
      title: item.title,
      date: item.date,
      size: item.size,
      highlights: item.highlights,
      pdf_url: item.pdfUrl || "",
    }))
  );

  // Sync Case Comps
  await supabase.from("case_comps").upsert(
    store.caseComps.map((item) => ({
      id: item.id,
      title: item.title,
      sponsor: item.sponsor,
      prize: item.prize,
      deadline: item.deadline,
      status: item.status,
      category: item.category,
      description: item.description,
      featured: item.featured || false,
    }))
  );

  // Sync CV Templates
  await supabase.from("cv_templates").upsert(
    store.cvTemplates.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      description: item.description,
      bullets: item.bullets,
      doc_url: item.docUrl || "",
    }))
  );

  // Sync HR News
  await supabase.from("hr_news").upsert(
    store.hrNews.map((item) => ({
      id: item.id,
      title: item.title,
      source: item.source,
      date: item.date,
      category: item.category,
      summary: item.summary,
      read_time: item.readTime,
    }))
  );

  // Sync Team Members
  await supabase.from("team_members").upsert(
    store.teamMembers.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      batch: item.batch,
      focus: item.focus,
      email: item.email,
      linkedin: item.linkedin || "",
    }))
  );

  // Sync Faculty Advisor
  await supabase.from("faculty_advisor").upsert({
    id: 1,
    name: store.facultyAdvisor.name,
    role: store.facultyAdvisor.role,
    department: store.facultyAdvisor.department,
    institution: store.facultyAdvisor.institution,
    bio: store.facultyAdvisor.bio,
  });
}

// React Custom Hook for automatic hydration
export function useHarmonyStore() {
  const [store, setStore] = useState<HarmonyDataStore>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Synchronous initial read from cache/localStorage
    setStore(getHarmonyStore());
    setLoading(false);

    // Asynchronous background hydration from Supabase Cloud
    if (isSupabaseConfigured) {
      fetchHarmonyStoreFromCloud().then((cloudData) => {
        setStore(cloudData);
      });
    }
  }, []);

  const updateStore = (newStore: HarmonyDataStore) => {
    setStore(newStore);
    saveHarmonyStore(newStore);
  };

  return { store, setStore: updateStore, loading, isCloudConnected: isSupabaseConfigured };
}
