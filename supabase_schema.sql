-- =========================================================
-- HARMONY HR CLUB — MASTER SUPABASE DATABASE & STORAGE SCHEMA
-- Copy and paste this ENTIRE script into Supabase SQL Editor
-- (https://supabase.com -> Project -> SQL Editor -> New Query)
-- =========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------
-- 1. ALUMNI TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.alumni (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  batch TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  focus_area TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 2. EVENTS TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  venue TEXT NOT NULL,
  category TEXT NOT NULL,
  speaker TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Upcoming', 'Completed', 'Registration Open')),
  link TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 3. ANNOUNCEMENTS (COLLEGE UPDATES) TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Academics', 'Placements', 'Competitions', 'General')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 4. VAULT CASES TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.vault_cases (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  summary TEXT NOT NULL,
  responses INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 5. NEWSLETTERS TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.newsletters (
  id TEXT PRIMARY KEY,
  edition TEXT NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  size TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb,
  pdf_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 6. CASE COMPS TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.case_comps (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  sponsor TEXT NOT NULL,
  prize TEXT NOT NULL,
  deadline TEXT NOT NULL,
  status TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 7. CV TEMPLATES TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cv_templates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  bullets JSONB DEFAULT '[]'::jsonb,
  doc_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 8. HR NEWS TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hr_news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  read_time TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 9. TEAM MEMBERS TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  batch TEXT NOT NULL,
  focus TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------
-- 10. FACULTY ADVISOR TABLE
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.faculty_advisor (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT NOT NULL,
  institution TEXT NOT NULL,
  bio TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- DISABLE ROW LEVEL SECURITY (PUBLIC ACCESS FOR CLUB MVP)
-- OR ENABLE AND PERMIT ANON READ/WRITE
-- =========================================================
ALTER TABLE public.alumni DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_cases DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletters DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_comps DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_news DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty_advisor DISABLE ROW LEVEL SECURITY;

-- =========================================================
-- STORAGE BUCKET FOR PDFS & IMAGES ("harmony-files")
-- =========================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('harmony-files', 'harmony-files', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public Storage Policy
CREATE POLICY "Public Read/Write Access on harmony-files"
ON storage.objects FOR ALL
USING (bucket_id = 'harmony-files')
WITH CHECK (bucket_id = 'harmony-files');

-- =========================================================
-- SEED INITIAL DATA
-- =========================================================

-- Alumni
INSERT INTO public.alumni (id, name, role, batch, company, location, focus_area, email, linkedin) VALUES
('alum-1', 'Ananya Sharma', 'Senior HR Business Partner', 'PGPM Class of 2022', 'Amazon India', 'Bengaluru', 'Talent Management & Org Design', 'ananya.s@greatlakes.edu.in', 'https://linkedin.com'),
('alum-2', 'Rohan Varma', 'Lead People Analytics Specialist', 'PGPM Class of 2021', 'Deloitte Consulting', 'Gurgaon', 'Workforce Planning & SQL/Python', 'rohan.v@greatlakes.edu.in', 'https://linkedin.com'),
('alum-3', 'Pooja Hegde', 'Compensation & Benefits Manager', 'PGPM Class of 2023', 'Asian Paints', 'Mumbai', 'Executive Rewards & Variable Pay', 'pooja.h@greatlakes.edu.in', 'https://linkedin.com'),
('alum-4', 'Karan Malhotra', 'Global Talent Acquisition Lead', 'PGPM Class of 2020', 'Flipkart', 'Bengaluru', 'Tech Hiring & Employer Branding', 'karan.m@greatlakes.edu.in', 'https://linkedin.com')
ON CONFLICT (id) DO NOTHING;

-- Events
INSERT INTO public.events (id, title, date, time, venue, category, speaker, description, status, link) VALUES
('evt-1', 'HR Tech & Workday Masterclass with CHRO Panel', 'August 12, 2026', '4:00 PM – 6:30 PM', 'GLIM Auditorium & Online Stream', 'Keynote & Workshop', 'Head of People Operations, Capgemini India', 'Hands-on breakdown of enterprise HR software implementation, workforce planning analytics, and candidate experience design.', 'Registration Open', ''),
('evt-2', 'Mock HR Case Interview Marathon', 'August 20, 2026', '10:00 AM – 5:00 PM', 'Syndicate Rooms 1–6', 'Placement Practice', 'Senior HR Alumni (Batches ''21–''24)', '1-on-1 simulated case interviews with instant rubric feedback and resume review sessions for final year students.', 'Upcoming', '')
ON CONFLICT (id) DO NOTHING;

-- Announcements
INSERT INTO public.announcements (id, title, date, category, content) VALUES
('ann-1', 'Summer Internship Project (SIP) Viva Schedule Released', 'July 24, 2026', 'Academics', 'The academic office has published the final SIP viva evaluation schedule for HR specialization students. All project reports must be uploaded to Moodle by 11:59 PM.'),
('ann-2', 'Pre-Placement Talks (PPT) Schedule — Corporate HR Track', 'July 22, 2026', 'Placements', 'Placement office PPT sessions kick off next week with visits from Accenture Strategy, Asian Paints, and Amazon. Check your student portal for venue assignments.')
ON CONFLICT (id) DO NOTHING;

-- Vault Cases
INSERT INTO public.vault_cases (id, date, title, topic, difficulty, summary, responses) VALUES
('case-041', 'July 22, 2026', 'The Remote Compensation Differential Conundrum', 'Rewards & Comp', 'Mid-level', 'Should employees relocating to low-cost tier-2 cities maintain metro salary levels? Engineering demands parity; Finance insists on geo-discounting.', 38),
('case-040', 'July 21, 2026', 'Whistleblower vs. High-Revenue Enterprise Lead', 'Ethics & Compliance', 'Executive', 'A junior analyst reports verbal harassment by the top sales Director bringing in 40% of Q2 revenue. The VP requests internal settlement without formal record.', 44),
('case-039', 'July 20, 2026', 'The Quiet Quitting Counter-Offer Strategy', 'Employee Engagement', 'HRBP Dilemma', 'A critical DevOps engineer submits resignation after 6 months of minimal engagement. Counter-offering 35% pay raise pisses off existing loyal team members.', 29)
ON CONFLICT (id) DO NOTHING;

-- Newsletters
INSERT INTO public.newsletters (id, edition, title, date, size, highlights, pdf_url) VALUES
('nl-1', 'July 2026 Edition', 'Navigating the New Labor Codes & AI Appraisals', 'July 2026', '2.4 MB PDF', '["Deep-dive into 2026 Labor Code revisions", "Alumni Interview with Amazon HRBP Lead", "Student Case Comps Winner Spotlight"]'::jsonb, ''),
('nl-2', 'June 2026 Edition', 'Total Rewards Re-imagined: Comp & Benefits in High Inflation', 'June 2026', '3.1 MB PDF', '["Equity vesting models in tech startups", "Mental health stipends benchmark", "GLIM Placement Preparation Checklist"]'::jsonb, '')
ON CONFLICT (id) DO NOTHING;

-- Case Comps
INSERT INTO public.case_comps (id, title, sponsor, prize, deadline, status, category, description, featured) VALUES
('cc-1', 'Tata Steel SHiFT HR Case Challenge 2026', 'Tata Steel', '₹5,000,000 + PPI Roles', 'August 15, 2026', 'Open for Registration', 'HR Strategy & Industrial Relations', 'Design a sustainable workforce transition model for decarbonized steel manufacturing plants across India.', true),
('cc-2', 'TVS Credit E.P.I.C Analytics & HR Challenge', 'TVS Credit', '₹3,000,000 + Pre-Placement Interviews', 'August 28, 2026', 'Upcoming', 'People Analytics & Fintech HR', 'Build an attrition predictive machine learning model combined with retention intervention policy frameworks.', false),
('cc-3', 'Mahindra Rise HR Leadership League', 'Mahindra & Mahindra', '₹4,000,000 + National Trophy', 'September 10, 2026', 'Upcoming', 'Diversity & Leadership Development', 'Formulate an inclusive hiring and mentorship roadmap for women in manufacturing and EV engineering roles.', false)
ON CONFLICT (id) DO NOTHING;

-- CV Templates
INSERT INTO public.cv_templates (id, title, type, description, bullets, doc_url) VALUES
('cv-1', 'Strategic HRBP & Talent Management Track', 'LaTeX & Word Format', 'Tailored for HR Generalist, HR Business Partner, and Leadership Development program interviews.', '["Emphasis on business metric impact (EBIT, turnover reduction)", "STAR formula layout"]'::jsonb, ''),
('cv-2', 'People Analytics & HR Tech Track', 'Clean Modern Format', 'Optimized for HR analytics, Workday/SAP SuccessFactors implementation, and workforce planning roles.', '["Highlighting SQL, Python, Tableau, and HRIS tools", "Quantified model accuracy metrics"]'::jsonb, ''),
('cv-3', 'Total Rewards & Compensation Track', 'Financial & Quantitative Format', 'Designed for compensation modeling, job evaluation, and benefits restructuring applications.', '["Focus on budget scale, equity plans, and wage benchmark analysis"]'::jsonb, '')
ON CONFLICT (id) DO NOTHING;

-- HR News
INSERT INTO public.hr_news (id, title, source, date, category, summary, read_time) VALUES
('news-1', 'Ministry of Labour Issues Revised Draft Guidelines on 4-Day Work Week', 'Economic Times HR World', 'July 23, 2026', 'Labor Policy', 'Proposed guidelines mandate 12-hour daily shifts to cap total weekly hours at 48 while granting mandatory 3 consecutive rest days. IT and manufacturing sectors debate overtime calculation rules.', '3 min read'),
('news-2', 'GCCs in India Surge Retention Efforts with Hybrid Transport Stipends', 'People Matters India', 'July 22, 2026', 'Total Rewards', 'Global Capability Centers (GCCs) in Bengaluru and Gurgaon are introducing flexible 3+2 hybrid models and transportation subsidies to counter attrition caused by strict full-time RTO mandates.', '4 min read'),
('news-3', 'AI-Powered Performance Reviews Face Employee Bias Concerns', 'Harvard Business Review', 'July 21, 2026', 'HR Technology', 'New study reveals 34% of enterprise employees express distrust towards sentiment analysis tools used during mid-year appraisals. Leading HR leaders advocate for human-in-the-loop audit protocols.', '5 min read')
ON CONFLICT (id) DO NOTHING;

-- Team Members
INSERT INTO public.team_members (id, name, role, batch, focus, email, linkedin) VALUES
('tm-1', 'Siddharth Menon', 'President & Student Lead', 'PGPM Class of 2026', 'Strategic Initiatives & Recruiter Relations', 'siddharth.m@greatlakes.edu.in', ''),
('tm-2', 'Divya Krishnan', 'Vice President & Vault Lead', 'PGPM Class of 2026', 'Daily Dilemma Case Curation & Content Strategy', 'divya.k@greatlakes.edu.in', ''),
('tm-3', 'Arjun Nambiar', 'Head of Corporate & Alumni Relations', 'PGPM Class of 2026', 'Alumni Connect & Placement Mentorship Drives', 'arjun.n@greatlakes.edu.in', ''),
('tm-4', 'Meera Sengupta', 'Head of Editorial & Publications', 'PGPM Class of 2026', 'Monthly Newsletter Archive & HR News Portal', 'meera.s@greatlakes.edu.in', '')
ON CONFLICT (id) DO NOTHING;

-- Faculty Advisor
INSERT INTO public.faculty_advisor (id, name, role, department, institution, bio) VALUES
(1, 'Dr. Rajesh K. Nair', 'Faculty Advisor & Professor of OB & HR', 'Organizational Behavior & Human Resources', 'Great Lakes Institute of Management Gurgaon', 'Over 20 years of research and corporate consulting experience in strategic human resource management, executive leadership development, and change management.')
ON CONFLICT (id) DO NOTHING;
