"use client";

import { useState, useEffect } from "react";
import { 
  Lock, 
  Key, 
  GraduationCap, 
  Calendar, 
  Bell, 
  ShieldAlert, 
  Mail, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw,
  CheckCircle2,
  LogOut,
  LayoutDashboard,
  Trophy,
  FileText,
  Newspaper,
  Users,
  Cloud,
  CloudOff,
  FileUp
} from "lucide-react";
import { 
  useHarmonyStore,
  initialData, 
  HarmonyDataStore,
  AlumniItem,
  EventItem,
  AnnouncementItem,
  VaultCaseItem,
  NewsletterItem,
  CaseCompItem,
  CvResourceItem,
  HrNewsItem,
  TeamMemberItem,
  saveHarmonyStore
} from "@/lib/adminStore";
import { uploadHarmonyFile } from "@/lib/fileUpload";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "alumni" | "events" | "announcements" | "vault" | "newsletters" | "caseComps" | "cvResources" | "hrNews" | "team" | "handover">("overview");

  const { store, setStore, isCloudConnected } = useHarmonyStore();
  const [toastMsg, setToastMsg] = useState("");

  // File upload state trackers
  const [nlFile, setNlFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const authSession = sessionStorage.getItem("harmony_admin_auth");
    if (authSession === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "harmony2026" || passcode.trim() === "glim2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("harmony_admin_auth", "true");
      setPasscodeError("");
      showToast("Access Granted. Welcome to Harmony Admin Portal!");
    } else {
      setPasscodeError("Invalid Passcode. Default is 'harmony2026'.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("harmony_admin_auth");
    setPasscode("");
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const updateStore = (newStore: HarmonyDataStore) => {
    setStore(newStore);
  };

  // --- Alumni Management ---
  const [newAlum, setNewAlum] = useState<Partial<AlumniItem>>({});
  const handleAddAlum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlum.name || !newAlum.company) return;
    const alumToAdd: AlumniItem = {
      id: "alum-" + Date.now(),
      name: newAlum.name || "",
      role: newAlum.role || "HR Specialist",
      batch: newAlum.batch || "PGPM Class of 2026",
      company: newAlum.company || "",
      location: newAlum.location || "Gurgaon",
      focusArea: newAlum.focusArea || "Human Resources",
      email: newAlum.email || "",
      linkedin: newAlum.linkedin || "https://linkedin.com",
    };
    updateStore({ ...store, alumni: [alumToAdd, ...(store.alumni || [])] });
    setNewAlum({});
    showToast("Alumni Profile Added Successfully!");
  };

  const handleDeleteAlum = (id: string) => {
    updateStore({ ...store, alumni: store.alumni.filter(a => a.id !== id) });
    showToast("Alumni Profile Removed.");
  };

  // --- Event Management ---
  const [newEvent, setNewEvent] = useState<Partial<EventItem>>({});
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    const evtToAdd: EventItem = {
      id: "evt-" + Date.now(),
      title: newEvent.title || "",
      date: newEvent.date || "",
      time: newEvent.time || "4:00 PM – 6:00 PM",
      venue: newEvent.venue || "GLIM Gurgaon Auditorium",
      category: newEvent.category || "Workshop & Keynote",
      speaker: newEvent.speaker || "Senior HR Leader",
      description: newEvent.description || "",
      status: (newEvent.status as EventItem["status"]) || "Upcoming",
    };
    updateStore({ ...store, events: [evtToAdd, ...(store.events || [])] });
    setNewEvent({});
    showToast("Campus Event Posted Successfully!");
  };

  const handleDeleteEvent = (id: string) => {
    updateStore({ ...store, events: store.events.filter(e => e.id !== id) });
    showToast("Event Deleted.");
  };

  // --- Announcement Management ---
  const [newAnn, setNewAnn] = useState<Partial<AnnouncementItem>>({});
  const handleAddAnn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnn.title || !newAnn.content) return;
    const annToAdd: AnnouncementItem = {
      id: "ann-" + Date.now(),
      title: newAnn.title || "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: (newAnn.category as AnnouncementItem["category"]) || "General",
      content: newAnn.content || "",
    };
    updateStore({ ...store, announcements: [annToAdd, ...(store.announcements || [])] });
    setNewAnn({});
    showToast("GLIM Announcement Published!");
  };

  const handleDeleteAnn = (id: string) => {
    updateStore({ ...store, announcements: store.announcements.filter(a => a.id !== id) });
    showToast("Announcement Removed.");
  };

  // --- Vault Case Management ---
  const [newCase, setNewCase] = useState<Partial<VaultCaseItem>>({});
  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.title || !newCase.summary) return;
    const caseToAdd: VaultCaseItem = {
      id: "case-" + Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      title: newCase.title || "",
      topic: newCase.topic || "Strategic HR",
      difficulty: newCase.difficulty || "Mid-level",
      summary: newCase.summary || "",
      responses: 0,
    };
    updateStore({ ...store, vaultCases: [caseToAdd, ...(store.vaultCases || [])] });
    setNewCase({});
    showToast("Daily Executive HR Dilemma Published!");
  };

  const handleDeleteCase = (id: string) => {
    updateStore({ ...store, vaultCases: store.vaultCases.filter(c => c.id !== id) });
    showToast("Vault Case Removed.");
  };

  // --- Newsletter Management ---
  const [newNl, setNewNl] = useState<Partial<NewsletterItem>>({});
  const handleAddNl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNl.title || !newNl.edition) return;

    let uploadedPdfUrl = newNl.pdfUrl || "";

    if (nlFile) {
      setIsUploading(true);
      const res = await uploadHarmonyFile(nlFile, "newsletters");
      setIsUploading(false);
      if (res.error) {
        alert(`File upload error: ${res.error}`);
        return;
      }
      if (res.url) {
        uploadedPdfUrl = res.url;
      }
    }

    const nlToAdd: NewsletterItem = {
      id: "nl-" + Date.now(),
      edition: newNl.edition || "New Edition",
      title: newNl.title || "",
      date: newNl.date || "August 2026",
      size: newNl.size || (nlFile ? `${(nlFile.size / (1024 * 1024)).toFixed(1)} MB PDF` : "2.5 MB PDF"),
      highlights: typeof newNl.highlights === "string" 
        ? (newNl.highlights as string).split(",").map(s => s.trim())
        : (newNl.highlights as unknown as string[]) || ["HR Market Trends", "Alumni Spotlight"],
      pdfUrl: uploadedPdfUrl,
    };

    updateStore({ ...store, newsletters: [nlToAdd, ...(store.newsletters || [])] });
    setNewNl({});
    setNlFile(null);
    showToast("Newsletter Edition Published!");
  };

  const handleDeleteNl = (id: string) => {
    updateStore({ ...store, newsletters: store.newsletters.filter(n => n.id !== id) });
    showToast("Newsletter Removed.");
  };

  // --- Case Comps Management ---
  const [newCc, setNewCc] = useState<Partial<CaseCompItem>>({});
  const handleAddCc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCc.title || !newCc.sponsor) return;
    const ccToAdd: CaseCompItem = {
      id: "cc-" + Date.now(),
      title: newCc.title || "",
      sponsor: newCc.sponsor || "",
      prize: newCc.prize || "₹1,000,000 + PPI",
      deadline: newCc.deadline || "August 30, 2026",
      status: newCc.status || "Open for Registration",
      category: newCc.category || "HR Strategy",
      description: newCc.description || "",
      featured: false,
    };
    updateStore({ ...store, caseComps: [ccToAdd, ...(store.caseComps || [])] });
    setNewCc({});
    showToast("Case Competition Posted!");
  };

  const handleDeleteCc = (id: string) => {
    updateStore({ ...store, caseComps: store.caseComps.filter(c => c.id !== id) });
    showToast("Case Competition Removed.");
  };

  // --- CV Templates Management ---
  const [newCv, setNewCv] = useState<Partial<CvResourceItem>>({});
  const handleAddCv = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCv.title || !newCv.type) return;

    let uploadedDocUrl = newCv.docUrl || "";

    if (cvFile) {
      setIsUploading(true);
      const res = await uploadHarmonyFile(cvFile, "cvs");
      setIsUploading(false);
      if (res.error) {
        alert(`File upload error: ${res.error}`);
        return;
      }
      if (res.url) {
        uploadedDocUrl = res.url;
      }
    }

    const cvToAdd: CvResourceItem = {
      id: "cv-" + Date.now(),
      title: newCv.title || "",
      type: newCv.type || "Word & LaTeX",
      description: newCv.description || "",
      bullets: ["Quantified business metrics", "STAR formula layout"],
      docUrl: uploadedDocUrl,
    };

    updateStore({ ...store, cvTemplates: [cvToAdd, ...(store.cvTemplates || [])] });
    setNewCv({});
    setCvFile(null);
    showToast("CV Template Added!");
  };

  const handleDeleteCv = (id: string) => {
    updateStore({ ...store, cvTemplates: store.cvTemplates.filter(c => c.id !== id) });
    showToast("CV Template Removed.");
  };

  // --- HR News Management ---
  const [newNews, setNewNews] = useState<Partial<HrNewsItem>>({});
  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title || !newNews.summary) return;
    const newsToAdd: HrNewsItem = {
      id: "news-" + Date.now(),
      title: newNews.title || "",
      source: newNews.source || "ET HRWorld",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: newNews.category || "HR Strategy",
      summary: newNews.summary || "",
      readTime: newNews.readTime || "3 min read",
    };
    updateStore({ ...store, hrNews: [newsToAdd, ...(store.hrNews || [])] });
    setNewNews({});
    showToast("HR News Brief Published!");
  };

  const handleDeleteNews = (id: string) => {
    updateStore({ ...store, hrNews: store.hrNews.filter(n => n.id !== id) });
    showToast("HR News Brief Removed.");
  };

  // --- Team Member Management ---
  const [newTeam, setNewTeam] = useState<Partial<TeamMemberItem>>({});
  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.role) return;
    const teamToAdd: TeamMemberItem = {
      id: "tm-" + Date.now(),
      name: newTeam.name || "",
      role: newTeam.role || "Executive Member",
      batch: newTeam.batch || "PGPM Class of 2026",
      focus: newTeam.focus || "Club Operations",
      email: newTeam.email || "member@greatlakes.edu.in",
    };
    updateStore({ ...store, teamMembers: [teamToAdd, ...(store.teamMembers || [])] });
    setNewTeam({});
    showToast("Team Member Added!");
  };

  const handleDeleteTeam = (id: string) => {
    updateStore({ ...store, teamMembers: store.teamMembers.filter(t => t.id !== id) });
    showToast("Team Member Removed.");
  };

  // --- Handover JSON Import/Export ---
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `harmony_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Backup JSON Exported for Handover!");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.alumni && parsed.events) {
            updateStore(parsed);
            showToast("Database Restored from Handover JSON!");
          }
        } catch {
          alert("Invalid JSON format.");
        }
      };
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Reset database to default seed data? Custom edits will be replaced.")) {
      updateStore(initialData);
      showToast("Reset to Default Seed Data.");
    }
  };

  const handleForceSyncCloud = () => {
    saveHarmonyStore(store);
    showToast("Triggered Sync to Supabase Cloud Database!");
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center px-4 py-12 bg-[#f8fafc]">
        <div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5850ec] text-white shadow-lg shadow-[#5850ec]/30">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="font-['Outfit'] text-2xl font-black text-slate-900">
              Harmony Committee Portal
            </h1>
            <p className="text-xs text-slate-500">
              Enter passcode to manage Alumni, Events, News, Cases & Handover Tools.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs font-semibold text-slate-700 block">
                Committee Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (harmony2026)"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
                <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
              {passcodeError && (
                <p className="text-xs font-semibold text-red-500">{passcodeError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#5850ec] py-3 text-xs font-bold text-white shadow-lg shadow-[#5850ec]/30 hover:bg-[#4b44dc] transition-all"
            >
              Unlock Admin Portal
            </button>
          </form>

          <p className="text-center font-mono text-[10px] text-slate-400">
            Passcode: <strong className="text-slate-700">harmony2026</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8 bg-[#f8fafc]">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-2xl animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5850ec] text-white shadow-md">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Outfit'] text-2xl font-black text-slate-900">
                Harmony Club Admin Dashboard
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              GLIM Gurgaon Student Committee Management Portal — All Site Content Linked & Updatable
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Cloud Database Connection Indicator */}
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-mono">
            {isCloudConnected ? (
              <>
                <Cloud className="h-4 w-4 text-emerald-600 animate-pulse" />
                <span className="font-bold text-emerald-700">Live Cloud DB</span>
              </>
            ) : (
              <>
                <CloudOff className="h-4 w-4 text-amber-600" />
                <span className="font-semibold text-amber-700">Local Mode</span>
              </>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            <LogOut className="h-3.5 w-3.5 text-slate-500" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-2 no-scrollbar">
        {[
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "alumni", label: `Alumni (${store.alumni?.length || 0})`, icon: GraduationCap },
          { id: "events", label: `Events (${store.events?.length || 0})`, icon: Calendar },
          { id: "announcements", label: `Updates (${store.announcements?.length || 0})`, icon: Bell },
          { id: "vault", label: `Vault Cases (${store.vaultCases?.length || 0})`, icon: ShieldAlert },
          { id: "newsletters", label: `Newsletters (${store.newsletters?.length || 0})`, icon: Mail },
          { id: "caseComps", label: `Case Comps (${store.caseComps?.length || 0})`, icon: Trophy },
          { id: "cvResources", label: `CV Vault (${store.cvTemplates?.length || 0})`, icon: FileText },
          { id: "hrNews", label: `HR News (${store.hrNews?.length || 0})`, icon: Newspaper },
          { id: "team", label: `Team (${store.teamMembers?.length || 0})`, icon: Users },
          { id: "handover", label: "Handover & Cloud DB", icon: RotateCcw },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 shrink-0 rounded-2xl px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#5850ec] text-white shadow-md shadow-[#5850ec]/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
              <span className="font-mono text-xs font-semibold text-slate-500">Alumni Directory</span>
              <p className="font-['Outfit'] text-3xl font-black text-slate-900">{store.alumni?.length || 0}</p>
              <p className="text-[11px] text-[#5850ec] font-mono">Mentors & HR Leaders</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
              <span className="font-mono text-xs font-semibold text-slate-500">Campus Events</span>
              <p className="font-['Outfit'] text-3xl font-black text-slate-900">{store.events?.length || 0}</p>
              <p className="text-[11px] text-emerald-600 font-mono">Workshops & Panels</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
              <span className="font-mono text-xs font-semibold text-slate-500">Vault Dilemmas</span>
              <p className="font-['Outfit'] text-3xl font-black text-slate-900">{store.vaultCases?.length || 0}</p>
              <p className="text-[11px] text-purple-600 font-mono">Executive HR Judgment</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
              <span className="font-mono text-xs font-semibold text-slate-500">Database Status</span>
              <p className="font-['Outfit'] text-xl font-bold text-slate-900">
                {isCloudConnected ? "Supabase Cloud" : "Local State"}
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                {isCloudConnected ? "100% Free Live PostgreSQL" : "Local Browser Storage"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Alumni */}
      {activeTab === "alumni" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#5850ec]" />
              <span>Add Alumni Profile</span>
            </h3>
            <form onSubmit={handleAddAlum} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newAlum.name || ""}
                  onChange={e => setNewAlum({ ...newAlum, name: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={newAlum.company || ""}
                    onChange={e => setNewAlum({ ...newAlum, company: e.target.value })}
                    placeholder="e.g. Amazon India"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Current Role</label>
                  <input
                    type="text"
                    value={newAlum.role || ""}
                    onChange={e => setNewAlum({ ...newAlum, role: e.target.value })}
                    placeholder="e.g. Senior HRBP"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Batch Year</label>
                  <input
                    type="text"
                    value={newAlum.batch || ""}
                    onChange={e => setNewAlum({ ...newAlum, batch: e.target.value })}
                    placeholder="e.g. PGPM Class of 2022"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={newAlum.location || ""}
                    onChange={e => setNewAlum({ ...newAlum, location: e.target.value })}
                    placeholder="e.g. Bengaluru"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Focus Area</label>
                <input
                  type="text"
                  value={newAlum.focusArea || ""}
                  onChange={e => setNewAlum({ ...newAlum, focusArea: e.target.value })}
                  placeholder="e.g. Org Design & Talent Management"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#5850ec] py-2.5 font-bold text-white shadow-md hover:bg-[#4b44dc]"
              >
                Add Alumni Profile
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Active Alumni Profiles ({store.alumni?.length || 0})
            </h3>
            <div className="space-y-3">
              {store.alumni?.map(a => (
                <div key={a.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">{a.name}</h4>
                    <p className="text-xs text-[#5850ec] font-semibold">{a.role} at {a.company}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{a.batch} • {a.location}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAlum(a.id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Events */}
      {activeTab === "events" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#5850ec]" />
              <span>Post Campus Event</span>
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newEvent.title || ""}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. CHRO Leadership Keynote"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Date *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.date || ""}
                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    placeholder="e.g. August 25, 2026"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={newEvent.time || ""}
                    onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                    placeholder="e.g. 4:00 PM - 6:00 PM"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Venue</label>
                <input
                  type="text"
                  value={newEvent.venue || ""}
                  onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })}
                  placeholder="e.g. GLIM Auditorium"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Speaker Info</label>
                <input
                  type="text"
                  value={newEvent.speaker || ""}
                  onChange={e => setNewEvent({ ...newEvent, speaker: e.target.value })}
                  placeholder="e.g. VP People, Accenture"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newEvent.description || ""}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event overview..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#5850ec] py-2.5 font-bold text-white shadow-md hover:bg-[#4b44dc]"
              >
                Post Event
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Campus Events ({store.events?.length || 0})
            </h3>
            <div className="space-y-3">
              {store.events?.map(e => (
                <div key={e.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      {e.status}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{e.title}</h4>
                    <p className="text-xs text-slate-500 font-mono">{e.date} • {e.venue}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(e.id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Announcements */}
      {activeTab === "announcements" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#5850ec]" />
              <span>Post GLIM Announcement</span>
            </h3>
            <form onSubmit={handleAddAnn} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={newAnn.title || ""}
                  onChange={e => setNewAnn({ ...newAnn, title: e.target.value })}
                  placeholder="e.g. SIP Evaluation Schedule Released"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Category</label>
                <select
                  value={newAnn.category || "General"}
                  onChange={e => setNewAnn({ ...newAnn, category: e.target.value as any })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                >
                  <option value="Academics">Academics</option>
                  <option value="Placements">Placements</option>
                  <option value="Competitions">Competitions</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Announcement Body *</label>
                <textarea
                  rows={4}
                  required
                  value={newAnn.content || ""}
                  onChange={e => setNewAnn({ ...newAnn, content: e.target.value })}
                  placeholder="Notice details..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#5850ec] py-2.5 font-bold text-white shadow-md hover:bg-[#4b44dc]"
              >
                Publish Announcement
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Campus Announcements ({store.announcements?.length || 0})
            </h3>
            <div className="space-y-3">
              {store.announcements?.map(a => (
                <div key={a.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                      {a.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{a.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{a.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnn(a.id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Vault Cases */}
      {activeTab === "vault" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#5850ec]" />
              <span>Post Vault HR Dilemma</span>
            </h3>
            <form onSubmit={handleAddCase} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Case Title *</label>
                <input
                  type="text"
                  required
                  value={newCase.title || ""}
                  onChange={e => setNewCase({ ...newCase, title: e.target.value })}
                  placeholder="e.g. Remote Salary Differential"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Topic</label>
                  <input
                    type="text"
                    value={newCase.topic || ""}
                    onChange={e => setNewCase({ ...newCase, topic: e.target.value })}
                    placeholder="e.g. Rewards & Comp"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Difficulty</label>
                  <input
                    type="text"
                    value={newCase.difficulty || ""}
                    onChange={e => setNewCase({ ...newCase, difficulty: e.target.value })}
                    placeholder="e.g. Mid-level"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Dilemma Summary *</label>
                <textarea
                  rows={4}
                  required
                  value={newCase.summary || ""}
                  onChange={e => setNewCase({ ...newCase, summary: e.target.value })}
                  placeholder="Describe the executive HR dilemma..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#5850ec] py-2.5 font-bold text-white shadow-md hover:bg-[#4b44dc]"
              >
                Publish Vault Case
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Active Vault Dilemmas ({store.vaultCases?.length || 0})
            </h3>
            <div className="space-y-3">
              {store.vaultCases?.map(c => (
                <div key={c.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200">
                      {c.topic}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{c.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{c.summary}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCase(c.id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Newsletters */}
      {activeTab === "newsletters" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#5850ec]" />
              <span>Publish Newsletter Edition</span>
            </h3>
            <form onSubmit={handleAddNl} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Edition Name *</label>
                <input
                  type="text"
                  required
                  value={newNl.edition || ""}
                  onChange={e => setNewNl({ ...newNl, edition: e.target.value })}
                  placeholder="e.g. August 2026 Edition"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Main Article Title *</label>
                <input
                  type="text"
                  required
                  value={newNl.title || ""}
                  onChange={e => setNewNl({ ...newNl, title: e.target.value })}
                  placeholder="e.g. AI Appraisal Tools & Labor Codes"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Highlights (comma separated)</label>
                <input
                  type="text"
                  value={typeof newNl.highlights === "string" ? newNl.highlights : ""}
                  onChange={e => setNewNl({ ...newNl, highlights: e.target.value as any })}
                  placeholder="e.g. Labor Reform, Amazon Interview, Student Comps"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              {/* PDF Uploader */}
              <div className="space-y-1">
                <label className="font-mono text-[11px] text-slate-700 block">Upload PDF File (Cloud Storage)</label>
                <label className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 cursor-pointer hover:border-[#5850ec] hover:bg-indigo-50/40 transition-colors">
                  <FileUp className="h-4 w-4 text-[#5850ec]" />
                  <span>{nlFile ? nlFile.name : "Choose PDF File..."}</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={e => e.target.files && setNlFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full rounded-full bg-[#5850ec] py-2.5 font-bold text-white shadow-md hover:bg-[#4b44dc] disabled:opacity-50"
              >
                {isUploading ? "Uploading PDF..." : "Publish Newsletter"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Published Newsletters ({store.newsletters?.length || 0})
            </h3>
            <div className="space-y-3">
              {store.newsletters?.map(n => (
                <div key={n.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-[#5850ec] border border-indigo-200">
                      {n.edition}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{n.title}</h4>
                    {n.pdfUrl && <p className="text-[10px] text-emerald-600 font-mono truncate">Cloud PDF Attached</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteNl(n.id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Case Competitions */}
      {activeTab === "caseComps" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#5850ec]" />
              <span>Post Case Competition</span>
            </h3>
            <form onSubmit={handleAddCc} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Competition Title *</label>
                <input
                  type="text"
                  required
                  value={newCc.title || ""}
                  onChange={e => setNewCc({ ...newCc, title: e.target.value })}
                  placeholder="e.g. Tata Steel HR Challenge"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Sponsor *</label>
                  <input
                    type="text"
                    required
                    value={newCc.sponsor || ""}
                    onChange={e => setNewCc({ ...newCc, sponsor: e.target.value })}
                    placeholder="e.g. Tata Steel"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Prize Pool</label>
                  <input
                    type="text"
                    value={newCc.prize || ""}
                    onChange={e => setNewCc({ ...newCc, prize: e.target.value })}
                    placeholder="e.g. ₹5,000,000 + PPI"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Registration Deadline</label>
                <input
                  type="text"
                  value={newCc.deadline || ""}
                  onChange={e => setNewCc({ ...newCc, deadline: e.target.value })}
                  placeholder="e.g. August 28, 2026"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Brief Description</label>
                <textarea
                  rows={3}
                  value={newCc.description || ""}
                  onChange={e => setNewCc({ ...newCc, description: e.target.value })}
                  placeholder="Case brief details..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#5850ec] py-2.5 font-bold text-white shadow-md hover:bg-[#4b44dc]"
              >
                Post Case Competition
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Active Competitions ({store.caseComps?.length || 0})
            </h3>
            <div className="space-y-3">
              {store.caseComps?.map(c => (
                <div key={c.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200">
                      {c.sponsor}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{c.title}</h4>
                    <p className="text-xs text-[#5850ec] font-semibold">{c.prize} • Deadline: {c.deadline}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCc(c.id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: CV Resources */}
      {activeTab === "cvResources" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#5850ec]" />
              <span>Add CV Template</span>
            </h3>
            <form onSubmit={handleAddCv} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Track Title *</label>
                <input
                  type="text"
                  required
                  value={newCv.title || ""}
                  onChange={e => setNewCv({ ...newCv, title: e.target.value })}
                  placeholder="e.g. HR Strategy & Consulting Track"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Format Type *</label>
                <input
                  type="text"
                  required
                  value={newCv.type || ""}
                  onChange={e => setNewCv({ ...newCv, type: e.target.value })}
                  placeholder="e.g. LaTeX & Word Format"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newCv.description || ""}
                  onChange={e => setNewCv({ ...newCv, description: e.target.value })}
                  placeholder="Template target roles..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              {/* Template File Uploader */}
              <div className="space-y-1">
                <label className="font-mono text-[11px] text-slate-700 block">Upload Document File (.docx / .pdf)</label>
                <label className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 cursor-pointer hover:border-[#5850ec] hover:bg-indigo-50/40 transition-colors">
                  <FileUp className="h-4 w-4 text-[#5850ec]" />
                  <span>{cvFile ? cvFile.name : "Choose File..."}</span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={e => e.target.files && setCvFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full rounded-full bg-[#5850ec] py-2.5 font-bold text-white shadow-md hover:bg-[#4b44dc] disabled:opacity-50"
              >
                {isUploading ? "Uploading File..." : "Add CV Template"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              CV Templates ({store.cvTemplates?.length || 0})
            </h3>
            <div className="space-y-3">
              {store.cvTemplates?.map(c => (
                <div key={c.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#5850ec] font-bold uppercase">{c.type}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{c.title}</h4>
                    <p className="text-xs text-slate-600">{c.description}</p>
                    {c.docUrl && <p className="text-[10px] text-emerald-600 font-mono">Cloud File Attached</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteCv(c.id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: HR News */}
      {activeTab === "hrNews" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#5850ec]" />
              <span>Publish HR News Brief</span>
            </h3>
            <form onSubmit={handleAddNews} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={newNews.title || ""}
                  onChange={e => setNewNews({ ...newNews, title: e.target.value })}
                  placeholder="e.g. New Labor Code Guidelines"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Source</label>
                  <input
                    type="text"
                    value={newNews.source || ""}
                    onChange={e => setNewNews({ ...newNews, source: e.target.value })}
                    placeholder="e.g. ET HRWorld"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={newNews.category || ""}
                    onChange={e => setNewNews({ ...newNews, category: e.target.value })}
                    placeholder="e.g. Labor Policy"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={newNews.summary || ""}
                  onChange={e => setNewNews({ ...newNews, summary: e.target.value })}
                  placeholder="Article digest..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#5850ec] py-2.5 font-bold text-white shadow-md hover:bg-[#4b44dc]"
              >
                Publish News Brief
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Published News Briefs ({store.hrNews?.length || 0})
            </h3>
            <div className="space-y-3">
              {store.hrNews?.map(n => (
                <div key={n.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[10px] font-bold text-[#5850ec]">
                      {n.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{n.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{n.summary}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteNews(n.id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Team Members */}
      {activeTab === "team" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#5850ec]" />
              <span>Add Student Board Member</span>
            </h3>
            <form onSubmit={handleAddTeam} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newTeam.name || ""}
                  onChange={e => setNewTeam({ ...newTeam, name: e.target.value })}
                  placeholder="e.g. Siddharth Menon"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Board Role *</label>
                  <input
                    type="text"
                    required
                    value={newTeam.role || ""}
                    onChange={e => setNewTeam({ ...newTeam, role: e.target.value })}
                    placeholder="e.g. President"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-slate-700 block mb-1">Batch Year</label>
                  <input
                    type="text"
                    value={newTeam.batch || ""}
                    onChange={e => setNewTeam({ ...newTeam, batch: e.target.value })}
                    placeholder="e.g. PGPM Class of 2026"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] text-slate-700 block mb-1">Focus Area</label>
                <input
                  type="text"
                  value={newTeam.focus || ""}
                  onChange={e => setNewTeam({ ...newTeam, focus: e.target.value })}
                  placeholder="e.g. Recruiter Relations"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#5850ec] py-2.5 font-bold text-white shadow-md hover:bg-[#4b44dc]"
              >
                Add Board Member
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Student Executive Board ({store.teamMembers?.length || 0})
            </h3>
            <div className="space-y-3">
              {store.teamMembers?.map(m => (
                <div key={m.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                    <p className="text-xs font-semibold text-[#5850ec]">{m.role} • {m.batch}</p>
                    <p className="text-[11px] text-slate-400">{m.focus}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTeam(m.id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Junior Handover & Cloud DB */}
      {activeTab === "handover" && (
        <div className="max-w-3xl space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-[#5850ec]" />
              <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                Cloud Database & Committee Handover Tools
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Harmony is connected to a 100% Free PostgreSQL & CDN Storage stack via Supabase. When handing over to incoming student leaders, you can either share the Supabase project keys or use 1-click JSON exports.
            </p>
          </div>

          {/* Sync Button */}
          {isCloudConnected && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-900 block">Supabase Cloud Sync Active</span>
                <span className="text-[11px] text-emerald-700">Edits automatically persist across all devices.</span>
              </div>
              <button
                onClick={handleForceSyncCloud}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
              >
                Sync Local State to Cloud
              </button>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <button
              onClick={handleExportJSON}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-xs font-bold text-white shadow-md hover:bg-[#5850ec] transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export Handover Backup (.json)</span>
            </button>

            <label className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-4 text-xs font-bold text-slate-700 cursor-pointer hover:border-[#5850ec] hover:bg-indigo-50/50 transition-colors">
              <Upload className="h-4 w-4 text-[#5850ec]" />
              <span>Import Handover JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>

          <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Reset Database</span>
              <span className="text-[11px] text-slate-400">Restore factory default seed records</span>
            </div>
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
