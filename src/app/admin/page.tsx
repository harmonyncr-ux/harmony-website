"use client";

import React, { useState, useEffect } from "react";
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
  FileUp,
  Edit3,
  X,
  Save,
  Link as LinkIcon,
  UserCheck
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
  FacultyAdvisor,
  deleteItemFromCloud
} from "@/lib/adminStore";
import { uploadHarmonyFile } from "@/lib/fileUpload";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "overview" | "alumni" | "events" | "announcements" | "vault" | "newsletters" | "caseComps" | "cvResources" | "hrNews" | "team" | "faculty" | "handover"
  >("overview");

  const { store, setStore, isCloudConnected } = useHarmonyStore();
  const [toastMsg, setToastMsg] = useState("");

  // File upload state trackers
  const [nlFile, setNlFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Modal edit state tracker
  const [editModal, setEditModal] = useState<{
    type: "alumni" | "events" | "announcements" | "vault" | "newsletters" | "caseComps" | "cvResources" | "hrNews" | "team" | "faculty" | null;
    item: any;
  }>({ type: null, item: null });

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
    deleteItemFromCloud("alumni", id);
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
      link: newEvent.link || "",
    };
    updateStore({ ...store, events: [evtToAdd, ...(store.events || [])] });
    setNewEvent({});
    showToast("Campus Event Posted Successfully!");
  };

  const handleDeleteEvent = (id: string) => {
    updateStore({ ...store, events: store.events.filter(e => e.id !== id) });
    deleteItemFromCloud("events", id);
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
    deleteItemFromCloud("announcements", id);
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
    deleteItemFromCloud("vault_cases", id);
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
    deleteItemFromCloud("newsletters", id);
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
      link: newCc.link || "https://unstop.com",
    };
    updateStore({ ...store, caseComps: [ccToAdd, ...(store.caseComps || [])] });
    setNewCc({});
    showToast("Case Competition Posted!");
  };

  const handleDeleteCc = (id: string) => {
    updateStore({ ...store, caseComps: store.caseComps.filter(c => c.id !== id) });
    deleteItemFromCloud("case_comps", id);
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
      bullets: typeof newCv.bullets === "string" 
        ? (newCv.bullets as string).split(",").map(s => s.trim())
        : (newCv.bullets as unknown as string[]) || ["Quantified business metrics", "STAR formula layout"],
      docUrl: uploadedDocUrl,
    };

    updateStore({ ...store, cvTemplates: [cvToAdd, ...(store.cvTemplates || [])] });
    setNewCv({});
    setCvFile(null);
    showToast("CV Template Added!");
  };

  const handleDeleteCv = (id: string) => {
    updateStore({ ...store, cvTemplates: store.cvTemplates.filter(c => c.id !== id) });
    deleteItemFromCloud("cv_templates", id);
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
      link: newNews.link || "",
      thumbnail: newNews.thumbnail || "",
    };
    updateStore({ ...store, hrNews: [newsToAdd, ...(store.hrNews || [])] });
    setNewNews({});
    showToast("HR News Brief Published!");
  };

  const handleDeleteNews = (id: string) => {
    updateStore({ ...store, hrNews: store.hrNews.filter(n => n.id !== id) });
    deleteItemFromCloud("hr_news", id);
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
      linkedin: newTeam.linkedin || "",
    };
    updateStore({ ...store, teamMembers: [teamToAdd, ...(store.teamMembers || [])] });
    setNewTeam({});
    showToast("Team Member Added!");
  };

  const handleDeleteTeam = (id: string) => {
    updateStore({ ...store, teamMembers: store.teamMembers.filter(t => t.id !== id) });
    deleteItemFromCloud("team_members", id);
    showToast("Team Member Removed.");
  };

  // --- Faculty Advisor Management ---
  const [facultyForm, setFacultyForm] = useState<FacultyAdvisor>(store.facultyAdvisor || initialData.facultyAdvisor);
  const handleSaveFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    updateStore({ ...store, facultyAdvisor: facultyForm });
    showToast("Faculty Advisor Details Saved!");
  };

  // --- Global Edit Modal Save Handler ---
  const handleSaveEditModal = (e: React.FormEvent) => {
    e.preventDefault();
    const { type, item } = editModal;
    if (!type || !item) return;

    if (type === "alumni") {
      updateStore({
        ...store,
        alumni: store.alumni.map(a => a.id === item.id ? item : a)
      });
    } else if (type === "events") {
      updateStore({
        ...store,
        events: store.events.map(ev => ev.id === item.id ? item : ev)
      });
    } else if (type === "announcements") {
      updateStore({
        ...store,
        announcements: store.announcements.map(an => an.id === item.id ? item : an)
      });
    } else if (type === "vault") {
      updateStore({
        ...store,
        vaultCases: store.vaultCases.map(c => c.id === item.id ? item : c)
      });
    } else if (type === "newsletters") {
      const formattedItem = {
        ...item,
        highlights: typeof item.highlights === "string" 
          ? item.highlights.split(",").map((s: string) => s.trim()) 
          : item.highlights
      };
      updateStore({
        ...store,
        newsletters: store.newsletters.map(n => n.id === item.id ? formattedItem : n)
      });
    } else if (type === "caseComps") {
      updateStore({
        ...store,
        caseComps: store.caseComps.map(c => c.id === item.id ? item : c)
      });
    } else if (type === "cvResources") {
      const formattedItem = {
        ...item,
        bullets: typeof item.bullets === "string"
          ? item.bullets.split(",").map((s: string) => s.trim())
          : item.bullets
      };
      updateStore({
        ...store,
        cvTemplates: store.cvTemplates.map(c => c.id === item.id ? formattedItem : c)
      });
    } else if (type === "hrNews") {
      updateStore({
        ...store,
        hrNews: store.hrNews.map(n => n.id === item.id ? item : n)
      });
    } else if (type === "team") {
      updateStore({
        ...store,
        teamMembers: store.teamMembers.map(t => t.id === item.id ? item : t)
      });
    }

    setEditModal({ type: null, item: null });
    showToast("Changes Saved Successfully!");
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
    setStore(store);
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
            <h1 className="font-['Outfit'] text-2xl font-extrabold text-slate-900">
              Harmony Admin Portal
            </h1>
            <p className="text-xs text-slate-500">
              Enter club master admin passcode to manage platform content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-700">Master Passcode</label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. harmony2026)"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] py-3 pl-10 pr-4 text-xs font-mono text-slate-900 focus:border-[#5850ec] focus:outline-none"
                />
                <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
              {passcodeError && (
                <p className="text-[11px] font-semibold text-rose-600 mt-1">{passcodeError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#5850ec] py-3 text-xs font-bold text-white shadow-md hover:bg-[#4b44dc] transition-all"
            >
              Unlock Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 bg-[#f8fafc]">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Admin Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5850ec] text-white shadow-md">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Outfit'] text-2xl font-extrabold text-slate-900">
                Harmony CMS Control Center
              </h1>
              {isCloudConnected ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-700 border border-emerald-200">
                  <Cloud className="h-3 w-3" /> Supabase Live
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-700 border border-amber-200">
                  <CloudOff className="h-3 w-3" /> Local Persistence Mode
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Manage GLIM HR Club events, news, alumni network, case comps, and downloads.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleForceSyncCloud}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-[#5850ec]/40 hover:bg-slate-50 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#5850ec]" />
            <span>Force Cloud Sync</span>
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Exit Admin</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {[
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "alumni", label: `Alumni (${store.alumni?.length || 0})`, icon: GraduationCap },
          { id: "events", label: `Events (${store.events?.length || 0})`, icon: Calendar },
          { id: "announcements", label: `Announcements (${store.announcements?.length || 0})`, icon: Bell },
          { id: "vault", label: `Vault Cases (${store.vaultCases?.length || 0})`, icon: ShieldAlert },
          { id: "newsletters", label: `Newsletters (${store.newsletters?.length || 0})`, icon: Mail },
          { id: "caseComps", label: `Case Comps (${store.caseComps?.length || 0})`, icon: Trophy },
          { id: "cvResources", label: `CV Templates (${store.cvTemplates?.length || 0})`, icon: FileText },
          { id: "hrNews", label: `HR News (${store.hrNews?.length || 0})`, icon: Newspaper },
          { id: "team", label: `Team (${store.teamMembers?.length || 0})`, icon: Users },
          { id: "faculty", label: "Faculty Advisor", icon: UserCheck },
          { id: "handover", label: "Backup & Handover", icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#5850ec] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: OVERVIEW & DASHBOARD STATS
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
            {[
              { label: "Alumni Directory", count: store.alumni?.length || 0, icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Campus Events", count: store.events?.length || 0, icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
              { label: "Case Competitions", count: store.caseComps?.length || 0, icon: Trophy, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Published Newsletters", count: store.newsletters?.length || 0, icon: Mail, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "CV Vault Resources", count: store.cvTemplates?.length || 0, icon: FileText, color: "text-rose-600", bg: "bg-rose-50" },
              { label: "Executive Dilemmas", count: store.vaultCases?.length || 0, icon: ShieldAlert, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Live HR News Briefs", count: store.hrNews?.length || 0, icon: Newspaper, color: "text-cyan-600", bg: "bg-cyan-50" },
              { label: "Club Team Members", count: store.teamMembers?.length || 0, icon: Users, color: "text-[#5850ec]", bg: "bg-[#EEF2FF]" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">{stat.label}</span>
                    <span className="font-['Outfit'] text-3xl font-extrabold text-slate-900 mt-1 block">{stat.count}</span>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4 text-left">
            <h3 className="font-['Outfit'] text-lg font-bold text-slate-900">
              Quick Administrative Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("alumni")}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#EEF2FF] px-4 py-2.5 text-xs font-bold text-[#5850ec] hover:bg-[#5850ec] hover:text-white transition-all"
              >
                <Plus className="h-4 w-4" /> Add New Alumni
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#EEF2FF] px-4 py-2.5 text-xs font-bold text-[#5850ec] hover:bg-[#5850ec] hover:text-white transition-all"
              >
                <Plus className="h-4 w-4" /> Post Campus Event
              </button>
              <button
                onClick={() => setActiveTab("caseComps")}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#EEF2FF] px-4 py-2.5 text-xs font-bold text-[#5850ec] hover:bg-[#5850ec] hover:text-white transition-all"
              >
                <Plus className="h-4 w-4" /> Post Case Competition
              </button>
              <button
                onClick={handleExportJSON}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all"
              >
                <Download className="h-4 w-4" /> Export Backup JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: ALUMNI MANAGEMENT
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "alumni" && (
        <div className="grid gap-8 lg:grid-cols-12 text-left">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-5 w-5 text-[#5850ec]" /> Add Alumni Profile
            </h3>
            <form onSubmit={handleAddAlum} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newAlum.name || ""}
                  onChange={(e) => setNewAlum({ ...newAlum, name: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Designation Role</label>
                  <input
                    type="text"
                    value={newAlum.role || ""}
                    onChange={(e) => setNewAlum({ ...newAlum, role: e.target.value })}
                    placeholder="e.g. HR Business Partner"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={newAlum.company || ""}
                    onChange={(e) => setNewAlum({ ...newAlum, company: e.target.value })}
                    placeholder="e.g. Deloitte / Amazon"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Batch Class</label>
                  <input
                    type="text"
                    value={newAlum.batch || ""}
                    onChange={(e) => setNewAlum({ ...newAlum, batch: e.target.value })}
                    placeholder="PGPM Class of 2026"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={newAlum.location || ""}
                    onChange={(e) => setNewAlum({ ...newAlum, location: e.target.value })}
                    placeholder="e.g. Gurgaon / Bengaluru"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Focus HR Domain</label>
                <input
                  type="text"
                  value={newAlum.focusArea || ""}
                  onChange={(e) => setNewAlum({ ...newAlum, focusArea: e.target.value })}
                  placeholder="e.g. Talent Acquisition & Comp"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={newAlum.email || ""}
                  onChange={(e) => setNewAlum({ ...newAlum, email: e.target.value })}
                  placeholder="alumni@greatlakes.edu.in"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={newAlum.linkedin || ""}
                  onChange={(e) => setNewAlum({ ...newAlum, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/profile"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#5850ec] py-2.5 text-xs font-bold text-white shadow hover:bg-[#4b44dc]"
              >
                Save Alumni Profile
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">Existing Alumni Directory</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {store.alumni?.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-[#5850ec]/30 transition-all">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">{a.name} ({a.batch})</span>
                    <span className="text-xs text-[#5850ec] font-medium block">{a.role} — {a.company}</span>
                    <span className="text-[10px] text-slate-500 block">{a.focusArea} | {a.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditModal({ type: "alumni", item: { ...a } })}
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#5850ec] hover:text-white transition-colors"
                      title="Edit Profile"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAlum(a.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Profile"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: EVENTS MANAGEMENT
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "events" && (
        <div className="grid gap-8 lg:grid-cols-12 text-left">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-5 w-5 text-[#5850ec]" /> Post Campus Event
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newEvent.title || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. HR Conclave 2026"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Date *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.date || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    placeholder="August 15, 2026"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={newEvent.time || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    placeholder="4:00 PM – 6:00 PM"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Venue</label>
                  <input
                    type="text"
                    value={newEvent.venue || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    placeholder="Auditorium / Zoom"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status</label>
                  <select
                    value={newEvent.status || "Upcoming"}
                    onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Registration Open">Registration Open</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Keynote Speaker</label>
                <input
                  type="text"
                  value={newEvent.speaker || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, speaker: e.target.value })}
                  placeholder="e.g. CHRO, Tech Mahindra"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newEvent.description || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event agenda summary..."
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Registration Link (URL)</label>
                <input
                  type="url"
                  value={newEvent.link || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
                  placeholder="https://forms.google.com/..."
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#5850ec] py-2.5 text-xs font-bold text-white shadow hover:bg-[#4b44dc]"
              >
                Publish Event
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">Campus Events Schedule</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {store.events?.map((ev) => (
                <div key={ev.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-[#5850ec]/30 transition-all">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{ev.title}</span>
                      <span className="rounded-full bg-indigo-50 px-2 py-0.2 text-[9px] font-bold text-indigo-700">{ev.status}</span>
                    </div>
                    <span className="text-xs text-slate-500 block">{ev.date} | {ev.time} | {ev.venue}</span>
                    <span className="text-[10px] text-[#5850ec] font-semibold block">Speaker: {ev.speaker}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditModal({ type: "events", item: { ...ev } })}
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#5850ec] hover:text-white transition-colors"
                      title="Edit Event"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: CASE COMPS MANAGEMENT
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "caseComps" && (
        <div className="grid gap-8 lg:grid-cols-12 text-left">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-5 w-5 text-[#5850ec]" /> Post Case Competition
            </h3>
            <form onSubmit={handleAddCc} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Competition Title *</label>
                <input
                  type="text"
                  required
                  value={newCc.title || ""}
                  onChange={(e) => setNewCc({ ...newCc, title: e.target.value })}
                  placeholder="e.g. Flipkart WiRED HR Challenge"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Corporate Sponsor *</label>
                  <input
                    type="text"
                    required
                    value={newCc.sponsor || ""}
                    onChange={(e) => setNewCc({ ...newCc, sponsor: e.target.value })}
                    placeholder="Flipkart / Unilever"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Prize Pool</label>
                  <input
                    type="text"
                    value={newCc.prize || ""}
                    onChange={(e) => setNewCc({ ...newCc, prize: e.target.value })}
                    placeholder="₹500,000 + PPI"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Deadline Date</label>
                  <input
                    type="text"
                    value={newCc.deadline || ""}
                    onChange={(e) => setNewCc({ ...newCc, deadline: e.target.value })}
                    placeholder="August 30, 2026"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status</label>
                  <select
                    value={newCc.status || "Registration Open"}
                    onChange={(e) => setNewCc({ ...newCc, status: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  >
                    <option value="Registration Open">Registration Open</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Unstop Registration URL</label>
                <input
                  type="url"
                  value={newCc.link || ""}
                  onChange={(e) => setNewCc({ ...newCc, link: e.target.value })}
                  placeholder="https://unstop.com/competitions/..."
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  value={newCc.description || ""}
                  onChange={(e) => setNewCc({ ...newCc, description: e.target.value })}
                  placeholder="Brief competition objective..."
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#5850ec] py-2.5 text-xs font-bold text-white shadow hover:bg-[#4b44dc]"
              >
                Post Case Competition
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">Live Case Competitions</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {store.caseComps?.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-[#5850ec]/30 transition-all">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{c.title}</span>
                      <span className="rounded-full bg-purple-50 px-2 py-0.2 text-[9px] font-bold text-purple-700">{c.sponsor}</span>
                    </div>
                    <span className="text-xs text-slate-500 block">Prize: {c.prize} | Deadline: {c.deadline}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold block">{c.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditModal({ type: "caseComps", item: { ...c } })}
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#5850ec] hover:text-white transition-colors"
                      title="Edit Case Comp"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCc(c.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Case Comp"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: NEWSLETTERS MANAGEMENT (With File Upload)
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "newsletters" && (
        <div className="grid gap-8 lg:grid-cols-12 text-left">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-5 w-5 text-[#5850ec]" /> Publish Newsletter Edition
            </h3>
            <form onSubmit={handleAddNl} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Edition Title *</label>
                <input
                  type="text"
                  required
                  value={newNl.title || ""}
                  onChange={(e) => setNewNl({ ...newNl, title: e.target.value })}
                  placeholder="e.g. The People Pulse — Issue 14"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Edition Tag</label>
                  <input
                    type="text"
                    value={newNl.edition || ""}
                    onChange={(e) => setNewNl({ ...newNl, edition: e.target.value })}
                    placeholder="August 2026 Edition"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Release Month</label>
                  <input
                    type="text"
                    value={newNl.date || ""}
                    onChange={(e) => setNewNl({ ...newNl, date: e.target.value })}
                    placeholder="August 2026"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Highlights (comma separated)</label>
                <input
                  type="text"
                  value={typeof newNl.highlights === "string" ? newNl.highlights : ""}
                  onChange={(e) => setNewNl({ ...newNl, highlights: e.target.value as any })}
                  placeholder="Labor Codes, AI in Hiring, Alumni Q&A"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">PDF File Upload or Direct URL</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setNlFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#EEF2FF] file:text-[#5850ec]"
                  />
                  <input
                    type="url"
                    value={newNl.pdfUrl || ""}
                    onChange={(e) => setNewNl({ ...newNl, pdfUrl: e.target.value })}
                    placeholder="Or paste direct Google Drive / PDF URL"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isUploading}
                className="w-full rounded-xl bg-[#5850ec] py-2.5 text-xs font-bold text-white shadow hover:bg-[#4b44dc] disabled:opacity-50"
              >
                {isUploading ? "Uploading PDF..." : "Publish Newsletter Edition"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">Published Newsletters</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {store.newsletters?.map((n) => (
                <div key={n.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-[#5850ec]/30 transition-all">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">{n.title}</span>
                    <span className="text-xs text-slate-500 block">{n.edition} | {n.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditModal({ type: "newsletters", item: { ...n, highlights: n.highlights?.join(", ") } })}
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#5850ec] hover:text-white transition-colors"
                      title="Edit Newsletter"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNl(n.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Newsletter"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 6: CV TEMPLATES MANAGEMENT
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "cvResources" && (
        <div className="grid gap-8 lg:grid-cols-12 text-left">
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 flex items-center gap-2">
              <Plus className="h-5 w-5 text-[#5850ec]" /> Add CV Template Resource
            </h3>
            <form onSubmit={handleAddCv} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Template Title *</label>
                <input
                  type="text"
                  required
                  value={newCv.title || ""}
                  onChange={(e) => setNewCv({ ...newCv, title: e.target.value })}
                  placeholder="e.g. HR Generalist & TA Template"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Resource Format / Type</label>
                <input
                  type="text"
                  value={newCv.type || ""}
                  onChange={(e) => setNewCv({ ...newCv, type: e.target.value })}
                  placeholder="Word (.docx) & Overleaf LaTeX"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newCv.description || ""}
                  onChange={(e) => setNewCv({ ...newCv, description: e.target.value })}
                  placeholder="ATS-friendly structure for FMCG HR roles..."
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Key Highlights (comma separated)</label>
                <input
                  type="text"
                  value={typeof newCv.bullets === "string" ? newCv.bullets : ""}
                  onChange={(e) => setNewCv({ ...newCv, bullets: e.target.value as any })}
                  placeholder="ATS 90+ Score, STAR Bullet Formula"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Template File Upload or Drive URL</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#EEF2FF] file:text-[#5850ec]"
                  />
                  <input
                    type="url"
                    value={newCv.docUrl || ""}
                    onChange={(e) => setNewCv({ ...newCv, docUrl: e.target.value })}
                    placeholder="Or paste direct download URL"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isUploading}
                className="w-full rounded-xl bg-[#5850ec] py-2.5 text-xs font-bold text-white shadow hover:bg-[#4b44dc] disabled:opacity-50"
              >
                {isUploading ? "Uploading CV..." : "Save CV Template"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">CV Resources Vault</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {store.cvTemplates?.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-[#5850ec]/30 transition-all">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">{c.title}</span>
                    <span className="text-xs text-[#5850ec] font-medium block">{c.type}</span>
                    <span className="text-[10px] text-slate-500 block">{c.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditModal({ type: "cvResources", item: { ...c, bullets: c.bullets?.join(", ") } })}
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#5850ec] hover:text-white transition-colors"
                      title="Edit CV Template"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCv(c.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete CV Template"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 7: FACULTY ADVISOR MANAGEMENT
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "faculty" && (
        <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6 text-left">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec]">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">Faculty Advisor Profile</h3>
              <p className="text-xs text-slate-500">Edit the official Faculty Mentor information displayed on the Team page.</p>
            </div>
          </div>

          <form onSubmit={handleSaveFaculty} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Faculty Name *</label>
              <input
                type="text"
                required
                value={facultyForm.name || ""}
                onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                placeholder="Dr. VP Singh"
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Role / Designation</label>
                <input
                  type="text"
                  value={facultyForm.role || ""}
                  onChange={(e) => setFacultyForm({ ...facultyForm, role: e.target.value })}
                  placeholder="Professor & Area Chair - HR"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Department</label>
                <input
                  type="text"
                  value={facultyForm.department || ""}
                  onChange={(e) => setFacultyForm({ ...facultyForm, department: e.target.value })}
                  placeholder="OB & Human Resources"
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Institution</label>
              <input
                type="text"
                value={facultyForm.institution || ""}
                onChange={(e) => setFacultyForm({ ...facultyForm, institution: e.target.value })}
                placeholder="Great Lakes Institute of Management, Gurgaon"
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Biography / Mentorship Statement</label>
              <textarea
                rows={4}
                value={facultyForm.bio || ""}
                onChange={(e) => setFacultyForm({ ...facultyForm, bio: e.target.value })}
                placeholder="Faculty profile biography..."
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-[#5850ec] py-3 text-xs font-bold text-white shadow hover:bg-[#4b44dc]"
            >
              Save Faculty Profile
            </button>
          </form>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 8: BACKUP & HANDOVER
         ───────────────────────────────────────────────────────────── */}
      {activeTab === "handover" && (
        <div className="grid gap-6 sm:grid-cols-2 text-left">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 flex items-center gap-2">
              <Download className="h-5 w-5 text-[#5850ec]" /> Export Full Backup JSON
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export all alumni profiles, events, case comps, and news briefs into a structured JSON file. Ideal for annual club team handovers.
            </p>
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#5850ec] px-5 py-3 text-xs font-bold text-white shadow hover:bg-[#4b44dc]"
            >
              <Download className="h-4 w-4" /> Export Backup JSON
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 flex items-center gap-2">
              <Upload className="h-5 w-5 text-indigo-600" /> Restore from Backup JSON
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Restore the platform state from a previously saved JSON backup file.
            </p>
            <label className="inline-flex items-center gap-2 rounded-2xl bg-indigo-50 border border-indigo-200 px-5 py-3 text-xs font-bold text-indigo-700 cursor-pointer hover:bg-indigo-100">
              <Upload className="h-4 w-4" /> Upload JSON File
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          GLOBAL EDIT MODAL
         ───────────────────────────────────────────────────────────── */}
      {editModal.type && editModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-['Outfit'] text-xl font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-[#5850ec]" /> Edit Item Details
              </h3>
              <button
                onClick={() => setEditModal({ type: null, item: null })}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditModal} className="space-y-4 text-xs">
              {/* Dynamic Edit Fields based on type */}
              {Object.keys(editModal.item).map((key) => {
                if (key === "id") return null;
                const value = editModal.item[key];
                return (
                  <div key={key}>
                    <label className="font-semibold text-slate-700 block mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    {typeof value === "boolean" ? (
                      <select
                        value={value ? "true" : "false"}
                        onChange={(e) => setEditModal({
                          ...editModal,
                          item: { ...editModal.item, [key]: e.target.value === "true" }
                        })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    ) : key === "description" || key === "summary" || key === "content" ? (
                      <textarea
                        rows={3}
                        value={value || ""}
                        onChange={(e) => setEditModal({
                          ...editModal,
                          item: { ...editModal.item, [key]: e.target.value }
                        })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value || ""}
                        onChange={(e) => setEditModal({
                          ...editModal,
                          item: { ...editModal.item, [key]: e.target.value }
                        })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] p-2.5 focus:border-[#5850ec] focus:outline-none"
                      />
                    )}
                  </div>
                );
              })}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModal({ type: null, item: null })}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#5850ec] px-5 py-2 text-xs font-bold text-white shadow hover:bg-[#4b44dc]"
                >
                  <Save className="h-4 w-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
