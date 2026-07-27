# Harmony HR Club — Master Project Context & Architecture

This document serves as the single source of truth for the **Harmony HR Club Website** for Great Lakes Institute of Management Gurgaon (GLIM Gurgaon). Keep this file updated whenever making architectural changes to the codebase.

---

## 📌 Project Overview
- **Application**: Harmony HR Club Flagship Web Platform
- **Institution**: Great Lakes Institute of Management Gurgaon (GLIM Gurgaon)
- **Official GitHub Repo**: `https://github.com/harmonyncr-ux/harmony-website.git`
- **Hosting Choice**: **Vercel** (Continuous Deployment linked to `main` branch).
- **Database Choice**: **Supabase** (PostgreSQL Cloud Database with live sync & instant `localStorage` cache hydration).
- **File & PDF Storage Choice**: **Cloudflare R2 (25 GB Free Storage with $0 Egress Fees)** for PDF newsletters, resume templates, and attachments.
- **Design System**: 100% Light Theme Only (`#FFFFFF` & `#F8FAFC`), ZaiHR aesthetic (Electric Periwinkle `#5850EC`, soft periwinkle badges `#EEF2FF`, dynamic glassmorphic header capsule, equal-height card grids).
- **Core Purpose**: Executive HR judgment practice (daily dilemmas), ATS resume prep, interview guides, alumni networking, campus notice board, and committee management.

---

## 🔑 Credentials & Master Keys

> [!IMPORTANT]
> The credentials below allow incoming student committee leads to access, manage, and deploy the Harmony HR Club platform.

| Resource / Portal | Parameter | Value / Access Info |
|---|---|---|
| **Admin Portal Passcode** | `/admin` Passcode | **`harmony2026`** (or `glim2026`) |
| **Allowed Student Domain** | College Google Auth | **`@greatlakes.edu.in`** |
| **Official GitHub Account** | Username / Org | **`harmonyncr-ux`** |
| **GitHub Repository** | HTTPS URL | `https://github.com/harmonyncr-ux/harmony-website.git` |
| **Supabase Project URL** | `NEXT_PUBLIC_SUPABASE_URL` | `https://iqtaatiwrbysjzozpdji.supabase.co` |
| **Supabase Anon Public Key** | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGFhdGl3cmJ5c2p6b3pwZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NDMxMzAsImV4cCI6MjEwMDUxOTEzMH0.OUljiaIqhjb_IP1SJrq_kZdFyuo4Ci54MGFW2OdlDoA` |
| **Cloudflare R2 Bucket** | `R2_BUCKET_NAME` | `harmony-files` (25 GB Free Storage, $0 Egress Fees) |

---

## 🛠️ Technology Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (`.tsx` / `.ts`)
- **Styling**: TailwindCSS + Custom CSS tokens (`globals.css` & `MagicBento.css`)
- **Icons**: Lucide React + custom inline SVG icons (`LinkedinIcon.tsx`)
- **Animations**: Framer Motion (`motion/react`) + GSAP physics engine + `canvas-confetti`
- **Authentication**: Supabase Auth Google OAuth with domain verification (`email.endsWith("@greatlakes.edu.in")`)
- **Database & State**: Dual-mode store (`src/lib/adminStore.ts`) — reactive custom hook `useHarmonyStore()` with Supabase cloud synchronization and instant `localStorage` cache fallback.
- **File Storage**: Cloudflare R2 via `@aws-sdk/client-s3` (`/api/upload`) with Supabase Storage fallback.
- **Automated Live Data Feeds**:
  - 🏆 **Live Unstop Case Competitions API** (`/api/case-comps`): Direct real-time fetch from Unstop's public API (`oppstatus=open`). Fetches competition titles, Unstop registration links, prize pools, deadlines, and categories.
  - 🗞️ **Live HR News Feed API** (`/api/hr-news`): Real-time RSS parser ingesting ET HRWorld and Livemint Corporate feeds with real article images and direct source links.

---

## 🔒 Access & Resource Security Architecture

The platform separates content into public preview features vs. protected student resources:

1. **Publicly Accessible (Open to Everyone)**:
   - Homepage (`/`) & Interactive HR Dilemma Engine (`/vault`)
   - HR News Portal (`/hr-news`) & MBA Case Comps Hub (`/case-comps`)
   - Campus Events Calendar (`/events`) & Newsletter Archive (`/newsletter`)
   - Campus Notice Board (`/college-updates`) & Executive Team Directory (`/team`)

2. **Student-Only Protected Resources (Requires `@greatlakes.edu.in` Sign-In)**:
   - **CV Vault & ATS Resume Downloads** (`/cv-resources`): Downloadable Word/LaTeX templates & recruiter guides wrapped in `<AuthGuard>`.
   - **Alumni Mentorship Network** (`/alumni`): Direct alumni email directory & LinkedIn contact links wrapped in `<AuthGuard>`.
   - **Interview Strategy Guide** (`/interview-prep`): Round-by-round framework cheat-sheets and sample recruiter answers wrapped in `<AuthGuard>`.

---

## 🎨 Design System & Visual FX

1. **Theme Lock**: 100% Light Theme Only (`#FFFFFF` & `#F8FAFC`). Text colors: `#0F172A` (Dark Slate) and `#475569`.
2. **Primary Accent**: Electric Periwinkle Indigo (`#5850EC` / `#4B44DC`) and soft periwinkle badges (`#EEF2FF`).
3. **Glassmorphic Floating Header**: Sticky header capsule (`bg-white/95 backdrop-blur-xl border-white/90`) with single-line layout (`lg:flex`) and user auth profile badge.
4. **React Bits `MagicBento` Component**: Ecosystem grid on the homepage featuring GSAP particle star animations, cursor spotlight, 3.5px periwinkle mouse-following border glow, 3D tilt, and magnetism.
5. **Equal Height Grid System**: Flex-stretch container styling across all card grids (`/hr-news`, `/case-comps`, `/newsletter`, `MagicBento`), guaranteeing equal card heights across every row.

---

## 🔐 Admin Control Center (`/admin`)

- **Passcode**: **`harmony2026`** (or `glim2026`)
- **Universal Edit Modals**: Full inline edit modals for every item across all 10 management tabs (*Alumni, Events, Case Comps, Newsletters, CV Vault, Executive Cases, HR News, Team Members, Faculty Advisor*).
- **Supabase Cloud Deletion Sync**: Integrated `deleteItemFromCloud()` so deleted items are removed permanently from Supabase Cloud DB.
- **File Upload Engine**: Built-in uploader (`src/lib/fileUpload.ts` & `/api/upload`) for Cloudflare R2 PDF newsletters and resume templates.
- **Handover Tools**: 1-click cloud sync, JSON backup export & restore.

---

## 📁 Key File Structure

```text
e:/ALL CLAUDE/HARMONY WEBSITE/
├── public/
│   ├── clg.png                  # Great Lakes Gurgaon Official Crest
│   └── GL GGN_harmony.png       # Great Lakes Gurgaon Harmony Logo
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global Root Layout & AuthProvider Wrapper
│   │   ├── page.tsx             # ZaiHR Light Homepage & Hero Banner
│   │   ├── globals.css          # Theme Tokens & Animation Keyframes
│   │   ├── admin/page.tsx       # Admin Control Center with Edit Modals & Cloud Deletion
│   │   ├── alumni/page.tsx      # Alumni Network Directory (Auth Guarded)
│   │   ├── case-comps/page.tsx  # MBA Case Competitions Hub (Live Unstop Feed)
│   │   ├── college-updates/page.tsx # Campus Notice Board (Cloud Hydrated)
│   │   ├── cv-resources/page.tsx # Resume Templates & ATS Guide (Auth Guarded)
│   │   ├── events/page.tsx      # Campus Keynotes & Workshops (Cloud Hydrated)
│   │   ├── hr-news/page.tsx     # HR News Portal (Live Feed + Real Photo Cards)
│   │   ├── interview-prep/page.tsx # Round-by-Round Interview Guide (Auth Guarded)
│   │   ├── newsletter/page.tsx  # Monthly Newsletter Archive (PDF Downloads)
│   │   ├── team/page.tsx        # Executive Board & Faculty Advisor
│   │   ├── vault/page.tsx       # The Vault Daily HR Dilemmas Engine
│   │   └── api/
│   │       ├── case-comps/route.ts # Live Unstop Public API Competitions Route
│   │       ├── hr-news/route.ts    # Live ET & Livemint RSS HR Feed Route
│   │       └── upload/route.ts     # Cloudflare R2 S3 Upload Endpoint
│   ├── components/
│   │   ├── Header.tsx           # Floating Glassmorphic Capsule Navbar with Dual Logos
│   │   ├── Footer.tsx           # Light Slate Footer with Dual Logos
│   │   ├── AuthModal.tsx        # College Sign-In Google OAuth Modal
│   │   ├── AuthGuard.tsx        # Student Resource Access Guard Wrapper
│   │   ├── AnimatedSection.tsx  # Framer Motion Scroll Reveals & Entrance Animations
│   │   ├── MagicBento/
│   │   │   ├── MagicBento.tsx   # React Bits GSAP MagicBento Component
│   │   │   └── MagicBento.css   # Periwinkle Border Glow & Particle Styling
│   │   ├── HrDilemmaSimulator.tsx # Interactive Daily Judgment Engine Widget
│   │   └── LinkedinIcon.tsx     # Custom SVG LinkedIn Icon
│   └── lib/
│       ├── adminStore.ts        # Store with Cloud Sync, Cloud Deletion & useHarmonyStore Hook
│       ├── authContext.tsx      # Supabase Google OAuth Provider & @greatlakes.edu.in Verification
│       ├── supabaseClient.ts    # Supabase Client Initialization
│       └── fileUpload.ts        # Cloudflare R2 Storage File Upload Helper
├── PROJECT_CONTEXT.md           # Master Project Context (This File)
└── task.md                      # Roadmap Notes
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
