"use client";

import { ReactNode } from "react";
import { useAuth } from "@/lib/authContext";
import { GraduationCap, Lock, Sparkles, ShieldAlert } from "lucide-react";
import Image from "next/image";

interface AuthGuardProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function AuthGuard({
  children,
  title = "Student Sign-In Required",
  description = "Please sign in with your Great Lakes Institute of Management Gurgaon Google account to access this section.",
}: AuthGuardProps) {
  const { user, setLoginModalOpen } = useAuth();

  if (user && user.isCollegeStudent) {
    return <>{children}</>;
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 text-center shadow-xl max-w-2xl mx-auto my-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#5850ec]/10 blur-3xl" />
      
      <div className="flex flex-col items-center space-y-4 relative z-10">
        
        <div className="flex items-center gap-2 mb-1">
          <Image 
            src="/clg.png" 
            alt="Great Lakes Gurgaon" 
            width={100} 
            height={28} 
            className="h-7 w-auto object-contain brightness-0" 
          />
          <span className="text-slate-300 font-light text-sm">|</span>
          <Image 
            src="/GL GGN_harmony.png" 
            alt="Harmony HR Club" 
            width={120} 
            height={28} 
            className="h-7 w-auto object-contain brightness-0" 
          />
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5850ec] shadow-inner">
          <Lock className="h-7 w-7" />
        </div>

        <div className="space-y-2 max-w-md">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
            <GraduationCap className="h-3.5 w-3.5 text-purple-600" />
            <span>@greatlakes.edu.in Domain Access Only</span>
          </div>

          <h3 className="font-['Outfit'] text-2xl font-extrabold text-slate-900">
            {title}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        <button
          onClick={() => setLoginModalOpen(true)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5850ec] to-[#4b44dc] px-7 py-3 text-xs font-bold text-white shadow-lg shadow-[#5850ec]/30 hover:scale-105 active:scale-95 transition-all"
        >
          <Sparkles className="h-4 w-4 text-indigo-100" />
          <span>Sign In with College Email</span>
        </button>

      </div>
    </div>
  );
}
