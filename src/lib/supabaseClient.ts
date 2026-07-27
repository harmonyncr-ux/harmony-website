import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://iqtaatiwrbysjzozpdji.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGFhdGl3cmJ5c2p6b3pwZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NDMxMzAsImV4cCI6MjEwMDUxOTEzMH0.OUljiaIqhjb_IP1SJrq_kZdFyuo4Ci54MGFW2OdlDoA";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
