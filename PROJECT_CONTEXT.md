# Harmony HR Club — Master Project Context & Documentation

This document serves as the single source of truth for the **Harmony HR Club Website** for Great Lakes Institute of Management Gurgaon (GLIM Gurgaon). Keep this file updated whenever making architectural changes to the codebase.

---

## 📌 Project Overview
- **Application**: Harmony HR Club Flagship Web Platform
- **Institution**: Great Lakes Institute of Management Gurgaon (GLIM Gurgaon)
- **Hosting Choice**: **Vercel** (Free Hobby Tier — 100 GB/month bandwidth, 1-click deployment via `npx vercel` or GitHub).
- **Database Architecture Choice**: **Supabase** (Recommended for cloud database migration — 100% Free Tier PostgreSQL + web table dashboard).
- **Design System**: 100% Light Theme Only (`#FFFFFF` & `#F8FAFC`), ZaiHR aesthetic (periwinkle accents `#5850EC`, watermark numbered bento cards `01`-`09`, hand-drawn doodle underlines & arrows, single-line header without scrollbars).
- **Core Purpose**: Executive HR judgment practice (daily dilemmas), ATS resume prep, interview guides, alumni networking, campus notice board, and committee management.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (`.tsx` / `.ts`)
- **Styling**: TailwindCSS + Vanilla CSS utilities (`globals.css`)
- **Icons**: Lucide React + custom inline LinkedIn SVG (`LinkedinIcon.tsx`)
- **Animations**: Framer Motion (`motion/react`) + `canvas-confetti`
- **State & Data Store**: Client-side reactive `adminStore` with `localStorage` persistence and fallback seed data (`src/lib/adminStore.ts`). Ready for Supabase cloud integration.

---

## 🎨 Branding & Visual System Rules

1. **Theme Lock**: 100% Light Theme Only. Background is `#FFFFFF` and `#F8FAFC`. Text is `#0F172A` (Dark Slate) and `#334155`.
2. **Primary Accent**: Electric Periwinkle Indigo (`#5850EC` / `#4B44DC`) and soft periwinkle badges (`#EEF2FF`).
3. **Logos**:
   - **Great Lakes Gurgaon Emblem**: `public/clg.png`
   - **Harmony Official Combined Logo**: `public/GL GGN_harmony.png`
   - **Header & Footer Branding**: Both logos rendered side-by-side without any background box container, with `brightness-0` styling.
4. **Header Navigation**: Single-line layout (`whitespace-nowrap`, no horizontal scrollbars, increased height `h-10 sm:h-12`).

---

## 🔐 Admin Portal & Handover System (`/admin`)

- **Route**: `/admin`
- **Passcode**: **`harmony2026`** (or `glim2026`)
- **Capabilities**: 100% dynamic CRUD control over all site entities without code edits:
  1. 🎓 **Alumni Profiles**
  2. 📅 **Campus Events & Keynotes**
  3. 📢 **GLIM Campus Notices**
  4. 🛡️ **The Vault Case Dilemmas**
  5. 📰 **Newsletter PDF Archives**
  6. 🏆 **MBA Case Competitions**
  7. 📄 **CV Vault & Templates**
  8. 🗞️ **HR News Briefs**
  9. 👥 **Executive Team Members**
- **Handover Tools**: 1-Click JSON Backup Export & Restore for seamless batch transitions.

---

## 🌐 100% Dynamically Linked Routes (15 Routes Total)

| Route | Page Purpose | Admin Linked? |
|---|---|---|
| `/` | Homepage & Hero Banner | Yes |
| `/vault` | The Vault Daily HR Dilemmas | Yes (`vaultCases`) |
| `/interview-prep` | Round-by-Round Interview Guide | Yes |
| `/alumni` | Alumni Connect Network | Yes (`alumni`) |
| `/hr-news` | HR News & Market Intelligence | Yes (`hrNews`) |
| `/case-comps` | MBA Case Competitions Hub | Yes (`caseComps`) |
| `/cv-resources` | CV Vault & ATS Templates | Yes (`cvTemplates`) |
| `/newsletter` | Monthly Newsletter Archive | Yes (`newsletters`) |
| `/events` | Campus Keynotes & Workshops | Yes (`events`) |
| `/college-updates` | GLIM Campus Notice Board | Yes (`announcements`) |
| `/team` | Executive Board & Faculty Mentor | Yes (`teamMembers`) |
| `/admin` | Committee Admin Dashboard | Yes |

---

## 📁 Key File Map

```text
e:/ALL CLAUDE/HARMONY WEBSITE/
├── public/
│   ├── clg.png                  # Great Lakes Gurgaon Official Crest
│   └── GL GGN_harmony.png       # Great Lakes Gurgaon Harmony Logo
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global Root Layout & Metadata
│   │   ├── page.tsx             # ZaiHR Light Homepage & Hero Banner
│   │   ├── globals.css          # Theme Tokens & ZaiHR Utilities
│   │   ├── admin/page.tsx       # Admin Dashboard & Committee Handover Portal
│   │   ├── alumni/page.tsx      # Alumni Connect Directory (Dynamic)
│   │   ├── case-comps/page.tsx  # MBA Case Competitions Hub (Dynamic)
│   │   ├── college-updates/page.tsx # Campus Notice Board (Dynamic)
│   │   ├── cv-resources/page.tsx # Resume Templates & ATS Guide (Dynamic)
│   │   ├── events/page.tsx      # Campus Keynotes & Workshops (Dynamic)
│   │   ├── hr-news/page.tsx     # Regulatory & Market HR News (Dynamic)
│   │   ├── interview-prep/page.tsx # Round-by-Round Interview Guide
│   │   ├── newsletter/page.tsx  # Monthly Newsletter Archive (Dynamic)
│   │   ├── team/page.tsx        # Executive Board & Faculty Advisor (Dynamic)
│   │   └── vault/page.tsx       # The Vault Daily HR Dilemmas (Dynamic)
│   ├── components/
│   │   ├── Header.tsx           # Single-Line Navbar with Dual Logos (No Box)
│   │   ├── Footer.tsx           # Light Slate Footer with Dual Logos
│   │   ├── HrDilemmaSimulator.tsx # Interactive Daily Judgment Engine
│   │   ├── BentoSectionCard.tsx # Watermark Numbered Bento Grid Cards (01-09)
│   │   ├── DoodleAccents.tsx    # SVGs for Underline & Arrow Doodles
│   │   └── LinkedinIcon.tsx     # Custom SVG LinkedIn Icon
│   └── lib/
│       └── adminStore.ts        # Central Data Store & LocalStorage Persistence
├── PROJECT_CONTEXT.md           # Master Project Context (This File)
└── task.md                      # Feature Ideation & Roadmap Notes
```

---

## ⚡ Deployment & Command Cheat Sheet

```powershell
# Local Development Server
npm run dev

# Production Build Verification
npm run build

# Deploy to Vercel (Free Hosting)
npx vercel
```
