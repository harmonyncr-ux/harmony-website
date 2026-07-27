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

  // Process and validate Supabase auth session
  const processSession = async (session: { user?: { email?: string; user_metadata?: { full_name?: string; name?: string; avatar_url?: string } } } | null) => {
    if (session?.user?.email) {
      if (validateCollegeEmail(session.user.email)) {
        const profile = createProfile(
          session.user.email,
          session.user.user_metadata?.full_name || session.user.user_metadata?.name,
          session.user.user_metadata?.avatar_url
        );
        setUser(profile);
        if (typeof window !== "undefined") {
          localStorage.setItem("harmony_college_user", JSON.stringify(profile));
        }
        setError(null);
        setLoginModalOpen(false);
      } else {
        setError(`Access restricted. Only ${ALLOWED_DOMAIN} college email accounts can access this platform.`);
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("harmony_college_user");
        }
        if (supabase) {
          await supabase.auth.signOut();
        }
      }
    } else {
      if (supabase) {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("harmony_college_user");
        }
      }
    }
  };

  // Initial session check & auth state subscription
  useEffect(() => {
    if (!supabase) {
      // If Supabase is disabled, check localStorage fallback
      const savedUserJson = typeof window !== "undefined" ? localStorage.getItem("harmony_college_user") : null;
      if (savedUserJson) {
        try {
          const parsed = JSON.parse(savedUserJson);
          if (validateCollegeEmail(parsed.email)) {
            setUser(parsed);
          } else {
            localStorage.removeItem("harmony_college_user");
          }
        } catch {
          localStorage.removeItem("harmony_college_user");
        }
      }
      setLoading(false);
      return;
    }

    // Check Supabase Auth session if active
    supabase.auth.getSession().then(({ data: { session } }) => {
      processSession(session);
      setLoading(false);
    });

    // Listen to Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      processSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Google Sign In Handler — Verifies Great Lakes College Email via Supabase OAuth
  const signInWithGoogle = async () => {
    setError(null);
    if (!supabase) {
      setError("Authentication service is currently unavailable.");
      return;
    }

    const redirectTo = typeof window !== "undefined" ? window.location.origin : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          hd: "greatlakes.edu.in",
        },
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  // Direct College Email Verification via Supabase OTP / Magic Link
  const signInWithCollegeEmail = async (email: string): Promise<boolean> => {
    setError(null);
    const cleanEmail = email.trim().toLowerCase();

    if (!validateCollegeEmail(cleanEmail)) {
      setError(`Access Restricted: Only college email IDs ending with ${ALLOWED_DOMAIN} are allowed.`);
      return false;
    }

    if (!supabase) {
      setError("Authentication service is currently unavailable.");
      return false;
    }

    const redirectTo = typeof window !== "undefined" ? window.location.origin : undefined;
    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("harmony_college_user");
    }
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
