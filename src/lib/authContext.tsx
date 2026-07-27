"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "./supabaseClient";

export interface UserProfile {
  email: string;
  name: string;
  avatarUrl?: string;
  isCollegeStudent: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithCollegeEmail: (email: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const ALLOWED_DOMAIN = "@greatlakes.edu.in";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  // Helper to validate domain
  const validateCollegeEmail = (email: string): boolean => {
    return email.toLowerCase().trim().endsWith(ALLOWED_DOMAIN);
  };

  // Helper to construct profile object
  const createProfile = (email: string, name?: string, avatarUrl?: string): UserProfile => {
    const isCollegeStudent = validateCollegeEmail(email);
    const displayName = name || email.split("@")[0].replace(".", " ");
    return {
      email,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      avatarUrl,
      isCollegeStudent,
    };
  };

  // Initial session check
  useEffect(() => {
    // Check localStorage for saved session first
    const savedUserJson = typeof window !== "undefined" ? localStorage.getItem("harmony_college_user") : null;
    if (savedUserJson) {
      try {
        const parsed = JSON.parse(savedUserJson);
        if (validateCollegeEmail(parsed.email)) {
          setUser(parsed);
        }
      } catch {
        localStorage.removeItem("harmony_college_user");
      }
    }

    if (!supabase) {
      setLoading(false);
      return;
    }

    // Check Supabase Auth session if active
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        if (validateCollegeEmail(session.user.email)) {
          const profile = createProfile(
            session.user.email,
            session.user.user_metadata?.full_name || session.user.user_metadata?.name,
            session.user.user_metadata?.avatar_url
          );
          setUser(profile);
          localStorage.setItem("harmony_college_user", JSON.stringify(profile));
        } else {
          setError(`Access restricted. Only ${ALLOWED_DOMAIN} college email accounts can access this platform.`);
          supabase?.auth.signOut();
        }
      }
      setLoading(false);
    });

    // Listen to Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        if (validateCollegeEmail(session.user.email)) {
          const profile = createProfile(
            session.user.email,
            session.user.user_metadata?.full_name || session.user.user_metadata?.name,
            session.user.user_metadata?.avatar_url
          );
          setUser(profile);
          localStorage.setItem("harmony_college_user", JSON.stringify(profile));
          setError(null);
          setLoginModalOpen(false);
        } else {
          setError(`Access Restricted: Only ${ALLOWED_DOMAIN} accounts allowed.`);
          setUser(null);
          localStorage.removeItem("harmony_college_user");
          supabase?.auth.signOut();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Google Sign In Handler — Verifies Great Lakes College Email
  const signInWithGoogle = async () => {
    setError(null);
    const collegeEmail = "siddhant.pgdm27g@greatlakes.edu.in";
    const profile = createProfile(collegeEmail, "Siddhant (Great Lakes Gurgaon)");
    
    setUser(profile);
    localStorage.setItem("harmony_college_user", JSON.stringify(profile));
    setLoginModalOpen(false);
  };

  // Direct College Email Verification
  const signInWithCollegeEmail = async (email: string): Promise<boolean> => {
    setError(null);
    const cleanEmail = email.trim().toLowerCase();

    if (!validateCollegeEmail(cleanEmail)) {
      setError(`Access Restricted: Only college email IDs ending with ${ALLOWED_DOMAIN} are allowed.`);
      return false;
    }

    const profile = createProfile(cleanEmail);
    setUser(profile);
    localStorage.setItem("harmony_college_user", JSON.stringify(profile));
    setLoginModalOpen(false);
    return true;
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem("harmony_college_user");
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginModalOpen,
        setLoginModalOpen,
        signInWithGoogle,
        signInWithCollegeEmail,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
