# Harmony HR Club Website — Ideation Notes

Status: **Discussion stage only.** Building starts only when explicitly greenlit.

---

## 1. Reference site: MarQuest (Marketing Club)

MarQuest's core skeleton: daily habit loop (quiz + streak) → knowledge base (GD topics/lexicon) → opportunities board (jobs/comps/live projects) → aptitude prep → mentor/about.

Goal for Harmony: take inspiration from the shape, but build around content and framing that's genuinely native to HR — not a reskin of marketing content.

Core framing difference:
- MarQuest = "master a skill, get scored" (quizzes, right/wrong answers)
- Harmony = "practice judgment, not just knowledge" (cases, dilemmas, frameworks)

---

## 2. Site Sections (agreed so far)

| Section | Content | Notes |
|---|---|---|
| The Vault (home hub) | Daily HR case/dilemma, streak-tracked | Core habit loop, judgment-based not quiz-based |
| Alumni Connect | Profiles/contact info of placed alumni, with their permission | No MarQuest equivalent |
| Interview Prep Guide | Round-by-round breakdown (HR round, case round, psychometric, group exercise) with sample answers | Potential flagship differentiator |
| Newsletter Archive | PDFs of past + upcoming monthly newsletters, searchable by month | No MarQuest equivalent |
| Events | Upcoming and past club events | Standard |
| MBA Case Comps | Listings of case competitions (HR-relevant and general, GLIM Gurgaon-wide) | Similar shape to MarQuest's comps, own content |
| HR News Portal | Curated HR/labor/compliance news | Regulatory beat, distinct from MarQuest's market/brand news |
| CV Resources | Templates, dos/don'ts, HR-specific resume guidance | |
| College Updates | GLIM Gurgaon-wide announcements relevant to students | |
| Team & Mentor | Core team members + faculty mentor | |

---

## 3. Automation Ideas

1. **RSS/feed aggregation** — pull from curated HR publication feeds (SHRM, People Matters, HR Katha, labor ministry notifications) on a schedule to auto-populate the news portal. No AI needed, just a cron job + feed parser.
2. **Scrape + AI summarize** — pipe aggregated articles through an LLM to generate short summaries and tags (compliance / culture / comp-benefits) before publishing.
3. **Newsletter drafting aid** — AI-drafted first-pass summary of the month's HR news, as an internal editorial tool to jumpstart newsletter writing (not public-facing).

## 4. AI Feature Ideas

- AI mock-interviewer: takes a question from the prep guide bank, lets a student answer, gives rubric-based feedback.
- CV reviewer: student submits resume, gets HR-recruiter-style feedback.
- Semantic search across the newsletter archive and case-comp postings.
- Scoped "ask about a framework" chatbot limited to the Frameworks & Terms content.

---

## 5. Pricing / Budget Estimate

| Item | Cheapest realistic path | Approx cost |
|---|---|---|
| Domain (.in) | Yearly registration | ~₹500-800/year |
| Hosting | Vercel or Netlify free tier | ₹0 |
| Database/backend | Supabase (or similar) free tier | ₹0 until scale grows |
| Newsletter PDF storage | Same free tier storage, or static files | ₹0 |
| Alumni signup emails | Free tier transactional email service | ₹0 |
| AI features (news summarizing, mock interviewer, CV reviewer) | Anthropic API, pay-as-you-go | Roughly ₹400-1000/month at club-scale usage |

AI cost basis (Anthropic API, pay-as-you-go, no subscription):
- Haiku 4.5: $1 / $5 per million input/output tokens
- Sonnet 4.6: $3 / $15 per million input/output tokens
- Daily news summarization (~20 articles/day, Haiku): well under $1/month
- AI mock-interview sessions (~100/month, Sonnet-level): roughly $1-2/month
- CV reviewer (~similar volume): roughly $1-2/month

Net: realistically ₹0-1000/month total, since almost everything fits free tiers at club scale. Note: pricing and free-tier limits change over time — re-check before finalizing a budget proposal.

---

## 6. New Feature Ideas (deeper pass)

| Idea | What it does | Why it matters |
|---|---|---|
| Company-tagged interview bank | Crowdsourced first-hand accounts from placed seniors, tagged by company/role | Most-searched content during placement season; no MarQuest equivalent |
| HR-tech primer | Short explainers on SAP SuccessFactors, Workday, Darwinbox, etc. | Common interview question, low student exposure otherwise |
| Ask-an-Alum board | Threaded Q&A feed instead of a static alumni directory | Builds a searchable, growing asset over time |
| Recruiter-facing page | "Hire from Harmony" page with aggregate (anonymized) placement stats | Makes the site two-sided; useful for company partnerships and faculty buy-in |
| Offer/CTC comparison tool | Calculator for fixed vs variable/bonus comparison, negotiation-practice simulator | Distinct, underserved skill vs general mock interviews |
| Adaptive prep path | Student flags target function/companies, content feed reorders around that | Real use of AI/personalization, not just a bolted-on chatbot |
| Weekly personalized digest | AI-generated email combining new HR news + new Vault case + relevant events | Combines automation, AI, and the existing newsletter habit |
| Peer mentorship matching | Pairs juniors with seniors in similar HR sub-functions/target companies | Low build effort, high goodwill, keeps community feel |

**Suggested priority for v1:** Company-tagged interview bank and Recruiter-facing page — high leverage, content likely already exists informally, and the recruiter page changes what the site *is* rather than just adding a page.

**Hold for v2:** Adaptive prep path and Weekly digest — both need existing content volume (Vault, News, Interview Bank) to have anything to personalize against.