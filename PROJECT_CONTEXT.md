# Harmony HR Club — Master Project Context & Documentation

This document serves as the single source of truth for the **Harmony HR Club Website** for Great Lakes Institute of Management Gurgaon (GLIM Gurgaon). Keep this file updated whenever making architectural changes to the codebase.

---

## 📌 Project Overview
- **Application**: Harmony HR Club Flagship Web Platform
- **Institution**: Great Lakes Institute of Management Gurgaon (GLIM Gurgaon)
- **Official GitHub Repo**: `https://github.com/harmonyncr-ux/harmony-website.git`
- **Hosting Choice**: **Vercel** (Free Tier — Continuous Deployment linked to Club GitHub repo).
- **Database & Storage Choice**: **Supabase** (100% Free PostgreSQL Cloud Database + Storage Bucket `harmony-files` for PDF newsletters and resume templates).
- **Design System**: 100% Light Theme Only (`#FFFFFF` & `#F8FAFC`), ZaiHR aesthetic (periwinkle accents `#5850EC`, watermark numbered bento cards `01`-`09`, hand-drawn doodle underlines & arrows, single-line header without scrollbars).
- **Core Purpose**: Executive HR judgment practice (daily dilemmas), ATS resume prep, interview guides, alumni networking, campus notice board, and committee management.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (`.tsx` / `.ts`)
- **Styling**: TailwindCSS + Vanilla CSS utilities (`globals.css`)
- **Icons**: Lucide React + custom inline LinkedIn SVG (`LinkedinIcon.tsx`)
- **Animations**: Framer Motion (`motion/react`) + `canvas-confetti`
- **Database & Cloud Storage**: Supabase JS SDK (`@supabase/supabase-js`)
- **State & Data Store**: Dual-mode reactive store (`src/lib/adminStore.ts`) featuring `useHarmonyStore()` custom React hook — live cloud sync with background hydration and instant `localStorage` cache fallback.

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
- **Cloud Status Badge**: Live visual connection indicator (`🟢 Live Cloud DB` vs `🟡 Local Mode`).
- **File Upload Engine**: Built-in drag-and-drop file uploader (`src/lib/fileUpload.ts`) for PDFs and documents to Supabase Storage CDN.
- **Capabilities**: 100% dynamic CRUD control over all site entities without code edits:
  1. 🎓 **Alumni Profiles**
  2. 📅 **Campus Events & Keynotes**
  3. 📢 **GLIM Campus Notices**
  4. 🛡️ **The Vault Case Dilemmas**
  5. 📰 **Newsletter PDF Archives (with PDF File Upload)**
  6. 🏆 **MBA Case Competitions**
  7. 📄 **CV Vault & Templates (with Document File Upload)**
  8. 🗞️ **HR News Briefs**
  9. 👥 **Executive Team Members**
- **Handover Tools**: 
  - 1-Click Cloud DB Sync (`saveHarmonyStore` -> Supabase)
  - 1-Click JSON Backup Export & Restore for seamless batch transitions.

---

## 🌐 100% Dynamically Linked Routes (15 Routes Total)

| Route | Page Purpose | Admin & Cloud Linked? |
|---|---|---|
| `/` | Homepage & Hero Banner | Yes |
| `/vault` | The Vault Daily HR Dilemmas | Yes (`vault_cases`) |
| `/interview-prep` | Round-by-Round Interview Guide | Yes |
| `/alumni` | Alumni Connect Network | Yes (`alumni`) |
| `/hr-news` | HR News & Market Intelligence | Yes (`hr_news`) |
| `/case-comps` | MBA Case Competitions Hub | Yes (`case_comps`) |
| `/cv-resources` | CV Vault & ATS Templates | Yes (`cv_templates` + CDN files) |
| `/newsletter` | Monthly Newsletter Archive | Yes (`newsletters` + CDN PDFs) |
| `/events` | Campus Keynotes & Workshops | Yes (`events`) |
| `/college-updates` | GLIM Campus Notice Board | Yes (`announcements`) |
| `/team` | Executive Board & Faculty Mentor | Yes (`team_members`) |
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
│   │   ├── admin/page.tsx       # Admin Dashboard with Cloud DB Badge & File Uploads
│   │   ├── alumni/page.tsx      # Alumni Connect Directory (Cloud Hydrated)
│   │   ├── case-comps/page.tsx  # MBA Case Competitions Hub (Cloud Hydrated)
│   │   ├── college-updates/page.tsx # Campus Notice Board (Cloud Hydrated)
│   │   ├── cv-resources/page.tsx # Resume Templates & ATS Guide (Live Downloads)
│   │   ├── events/page.tsx      # Campus Keynotes & Workshops (Cloud Hydrated)
│   │   ├── hr-news/page.tsx     # Regulatory & Market HR News (Cloud Hydrated)
│   │   ├── interview-prep/page.tsx # Round-by-Round Interview Guide
│   │   ├── newsletter/page.tsx  # Monthly Newsletter Archive (Live PDF Downloads)
│   │   ├── team/page.tsx        # Executive Board & Faculty Advisor (Cloud Hydrated)
│   │   └── vault/page.tsx       # The Vault Daily HR Dilemmas (Cloud Hydrated)
│   ├── components/
│   │   ├── Header.tsx           # Single-Line Navbar with Dual Logos
│   │   ├── Footer.tsx           # Light Slate Footer with Dual Logos
│   │   ├── HrDilemmaSimulator.tsx # Interactive Daily Judgment Engine
│   │   ├── BentoSectionCard.tsx # Watermark Numbered Bento Grid Cards (01-09)
│   │   ├── DoodleAccents.tsx    # SVGs for Underline & Arrow Doodles
│   │   └── LinkedinIcon.tsx     # Custom SVG LinkedIn Icon
│   └── lib/
│       ├── adminStore.ts        # Store with Cloud Sync & useHarmonyStore Hook
│       ├── supabaseClient.ts    # Supabase Client Initialization
│       └── fileUpload.ts        # Supabase CDN Storage File Upload Helper
├── .env.local                   # Environment Variables (Supabase Keys)
├── .env.local.example           # Example Template for Environment Variables
├── supabase_schema.sql          # Master SQL Schema Script for Supabase Setup
├── PROJECT_CONTEXT.md           # Master Project Context (This File)
└── task.md                      # Feature Ideation & Roadmap Notes
```

---

## ⚡ Key Environment Variables

Create `.env.local` locally and add these in Vercel settings:

```env
NEXT_PUBLIC_SUPABASE_URL=https://iqtaatiwrbysjzozpdji.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ⚡ Command & Deployment Cheat Sheet

```powershell
# Local Development Server
npm run dev

# Production Build Verification
npm run build

# Push Updates to GitHub (Triggers Automatic Vercel Deployment)
git add .
git commit -m "Update feature"
git push origin main
```
