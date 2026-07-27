"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldAlert, GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function AuthModal() {
  const { loginModalOpen, setLoginModalOpen, signInWithGoogle, error, clearError } = useAuth();

  if (!loginModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLoginModalOpen(false)}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/80 bg-white p-7 shadow-2xl shadow-slate-900/20"
        >
          {/* Close button */}
          <button
            onClick={() => setLoginModalOpen(false)}
            className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-6 text-center">
            
            {/* Header branding */}
            <div className="flex flex-col items-center space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Image 
                  src="/clg.png" 
                  alt="Great Lakes Gurgaon" 
                  width={110} 
                  height={32} 
                  className="h-8 w-auto object-contain brightness-0" 
                />
                <span className="text-slate-300 font-light text-base">|</span>
                <Image 
                  src="/GL GGN_harmony.png" 
                  alt="Harmony HR Club" 
                  width={130} 
                  height={32} 
                  className="h-8 w-auto object-contain brightness-0" 
                />
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-50 px-3 py-1 text-[11px] font-bold text-purple-700">
                <GraduationCap className="h-3.5 w-3.5 text-purple-600" />
                <span>Student Portal</span>
              </div>

              <h2 className="font-['Outfit'] text-2xl font-extrabold text-slate-900">
                Sign In to Harmony
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
                Sign in with your Great Lakes Gurgaon Google account to access student resources and practice tools.
              </p>
            </div>

            {/* Error Banner if invalid domain attempted */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 text-left text-xs text-rose-700 space-y-1"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />
                    Access Alert
                  </span>
                  <button onClick={clearError} className="text-rose-500 hover:underline text-[10px]">
                    Dismiss
                  </button>
                </div>
                <p className="text-[11px] text-rose-800 leading-relaxed">{error}</p>
              </motion.div>
            )}

            {/* Single Primary Action: Sign in with Google Button */}
            <div className="pt-2 pb-1">
              <button
                onClick={() => signInWithGoogle()}
                className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3.5 px-4 text-xs font-bold text-slate-800 shadow-md hover:border-[#5850ec]/50 hover:bg-slate-50 hover:shadow-lg active:scale-[0.99] transition-all"
              >
                {/* Google "G" Colored SVG Icon */}
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>

                <span>Sign in with Google</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
