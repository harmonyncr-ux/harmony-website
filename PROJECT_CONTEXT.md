# Harmony HR Club — Master Project Context & Documentation

This document serves as the single source of truth for the **Harmony HR Club Website** for Great Lakes Institute of Management Gurgaon (GLIM Gurgaon). Keep this file updated whenever making architectural changes to the codebase.

---

## 📌 Project Overview
- **Application**: Harmony HR Club Flagship Web Platform
- **Institution**: Great Lakes Institute of Management Gurgaon (GLIM Gurgaon)
- **Official GitHub Repo**: `https://github.com/harmonyncr-ux/harmony-website.git`
- **Hosting Choice**: **Vercel** (Free Tier — Continuous Deployment linked to Club GitHub repo).
- **Database Choice**: **Supabase** (100% Free PostgreSQL Cloud Database).
- **File & PDF Storage Choice**: **Cloudflare R2 (25 GB Free Tier Storage with $0 Egress Fees)** for PDF newsletters, resume templates, and event attachments, with automatic Supabase Storage fallback.
- **Design System**: 100% Light Theme Only (`#FFFFFF` & `#F8FAFC`), ZaiHR aesthetic (periwinkle accents `#5850EC`, watermark numbered bento cards `01`-`09`, hand-drawn doodle underlines & arrows, single-line header without scrollbars).
- **Core Purpose**: Executive HR judgment practice (daily dilemmas), ATS resume prep, interview guides, alumni networking, campus notice board, and committee management.

---

## 🔑 Project Credentials & Handover Keys

> [!IMPORTANT]
> The credentials below allow incoming student committee leads to access, manage, and deploy the Harmony HR Club platform.

| Resource / Portal | Parameter | Value / Access Info |
|---|---|---|
| **Admin Portal Passcode** | `/admin` Passcode | **`harmony2026`** (or `glim2026`) |
| **Official GitHub Account** | Username / Org | **`harmonyncr-ux`** |
| **GitHub Repository** | HTTPS URL | `https://github.com/harmonyncr-ux/harmony-website.git` |
| **Supabase Project URL** | `NEXT_PUBLIC_SUPABASE_URL` | `https://iqtaatiwrbysjzozpdji.supabase.co` |
| **Supabase Anon Public Key** | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGFhdGl3cmJ5c2p6b3pwZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NDMxMzAsImV4cCI6MjEwMDUxOTEzMH0.OUljiaIqhjb_IP1SJrq_kZdFyuo4Ci54MGFW2OdlDoA` |
| **Cloudflare R2 Bucket** | `R2_BUCKET_NAME` | `harmony-files` (25 GB Free Storage, $0 Egress Fees) |

---

## 🛠️ Technology Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (`.tsx` / `.ts`)
- **Styling**: TailwindCSS + Vanilla CSS utilities (`globals.css`)
- **Icons**: Lucide React + custom inline LinkedIn SVG (`LinkedinIcon.tsx`)
- **Animations**: Framer Motion (`motion/react`) + `canvas-confetti`
- **Database**: Supabase JS SDK (`@supabase/supabase-js`)
- **Cloud Storage**: **Cloudflare R2** via `@aws-sdk/client-s3` (`/api/upload`) for 25 GB free PDF newsletter and resume storage with $0 egress bandwidth costs.
- **State & Data Store**: Dual-mode reactive store (`src/lib/adminStore.ts`) featuring `useHarmonyStore()` custom React hook — live cloud sync with background hydration and instant `localStorage` cache fallback.
- **Automated Live Data Feeds**:
  - 🏆 **Live Unstop Case Competitions API** (`/api/case-comps`): Direct real-time fetch from Unstop's public API (`oppstatus=open`). Fetches exact competition titles, direct Unstop registration links, prize pools, deadlines, and categories. 1-hour server revalidation + manual `[Refresh]`.
  - 🗞️ **Live HR News Feed API** (`/api/hr-news`): Real-time ingestion from **Economic Times HR & Jobs** (`img.etimg.com`) and **Livemint Corporate** (`livemint.com/lm-img`) plus Google News feeds (`force-dynamic`, `revalidate = 0`). Extracts real article press photos, resolves direct publisher URLs, and formats 6 live cards. Instant `[Refresh]`.

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
- **File Upload Engine**: Built-in uploader (`src/lib/fileUpload.ts` & `/api/upload`) uploading to Cloudflare R2 (25 GB Free Storage) for PDFs and documents.
- **Capabilities**: 100% dynamic CRUD control over all site entities without code edits:
  1. 🎓 **Alumni Profiles**
  2. 📅 **Campus Events & Keynotes**
  3. 📢 **GLIM Campus Notices**
  4. 🛡️ **The Vault Case Dilemmas**
  5. 📰 **Newsletter PDF Archives (with PDF File Upload to Cloudflare R2)**
  6. 🏆 **MBA Case Competitions**
  7. 📄 **CV Vault & Templates (with Document File Upload to Cloudflare R2)**
  8. 🗞️ **HR News Briefs**
  9. 👥 **Executive Team Members**
- **Handover Tools**: 
  - 1-Click Cloud DB Sync (`saveHarmonyStore` -> Supabase)
  - 1-Click JSON Backup Export & Restore for seamless batch transitions.

---

## 🌐 Dynamically Linked & Automated Routes (18 Routes Total)

| Route | Page Purpose | Data & Integration Type |
|---|---|---|
| `/` | Homepage & Hero Banner | Dynamic Store |
| `/vault` | The Vault Daily HR Dilemmas | Dynamic Store (`vault_cases`) |
| `/interview-prep` | Round-by-Round Interview Guide | Dynamic Store |
| `/alumni` | Alumni Connect Network | Dynamic Store (`alumni`) |
| `/hr-news` | HR News & Market Intelligence | Live RSS Automated Feed (`/api/hr-news` with real photos, 6 cards) |
| `/api/hr-news` | Live HR News API Endpoint | Dynamic RSS parser with ET & Livemint image extraction |
| `/api/upload` | Cloudflare R2 Upload API | Serverless S3 PutObject API for PDFs & documents |
| `/case-comps` | MBA Case Competitions Hub | Live Unstop API Feed (`/api/case-comps`, 10+ cards) |
| `/api/case-comps` | Live Case Comps API Endpoint | 1-hr cached direct Unstop Public API integration |
| `/cv-resources` | CV Vault & ATS Templates | Dynamic Store (`cv_templates` + Cloudflare R2 CDN files) |
| `/newsletter` | Monthly Newsletter Archive | Dynamic Store (`newsletters` + Cloudflare R2 CDN PDFs) |
| `/events` | Campus Keynotes & Workshops | Dynamic Store (`events`) |
| `/college-updates` | GLIM Campus Notice Board | Dynamic Store (`announcements`) |
| `/team` | Executive Board & Faculty Mentor | Dynamic Store (`team_members`) |
| `/admin` | Committee Admin Dashboard | Supabase Cloud Sync & Cloudflare R2 Upload Engine |

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
│   │   ├── admin/page.tsx       # Admin Dashboard with Cloud DB Badge & R2 File Uploads
│   │   ├── alumni/page.tsx      # Alumni Connect Directory (Cloud Hydrated)
│   │   ├── api/
│   │   │   ├── case-comps/route.ts # Live Unstop Public API Competitions Route
│   │   │   ├── hr-news/route.ts    # Live ET & Livemint RSS HR Feed with Real Photos
│   │   │   └── upload/route.ts     # Cloudflare R2 S3 Upload Endpoint
│   │   ├── case-comps/page.tsx  # MBA Case Competitions Hub (Live Unstop Feed)
│   │   ├── college-updates/page.tsx # Campus Notice Board (Cloud Hydrated)
│   │   ├── cv-resources/page.tsx # Resume Templates & ATS Guide (Live Downloads)
│   │   ├── events/page.tsx      # Campus Keynotes & Workshops (Cloud Hydrated)
│   │   ├── hr-news/page.tsx     # Regulatory & Market HR News (Live Feed + Real Photo Cards)
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
│       └── fileUpload.ts        # Cloudflare R2 Storage File Upload Helper
├── .env.local                   # Environment Variables (Local Keys)
├── .env.example                 # Example Template for Environment Variables
├── supabase_schema.sql          # Master SQL Schema Script for Supabase Setup
├── PROJECT_CONTEXT.md           # Master Project Context (This File)
└── task.md                      # Feature Ideation & Roadmap Notes
```

---

## ⚡ Key Environment Variables

Create `.env.local` locally and add these in Vercel settings:

```env
# Cloudflare R2 Credentials (25 GB Free PDF & File Storage, $0 Egress Fees)
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=harmony-files
NEXT_PUBLIC_R2_PUBLIC_DOMAIN=https://pub-xxx.r2.dev

# Supabase Credentials (Cloud Database)
NEXT_PUBLIC_SUPABASE_URL=https://iqtaatiwrbysjzozpdji.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGFhdGl3cmJ5c2p6b3pwZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NDMxMzAsImV4cCI6MjEwMDUxOTEzMH0.OUljiaIqhjb_IP1SJrq_kZdFyuo4Ci54MGFW2OdlDoA
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
