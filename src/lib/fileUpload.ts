import { supabase, isSupabaseConfigured } from "./supabaseClient";

export async function uploadHarmonyFile(
  file: File,
  folder: "newsletters" | "cvs" | "events" | "general" = "general"
): Promise<{ url: string | null; error: string | null }> {
  // 1. Try Cloudflare R2 Upload via /api/upload
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const r2Res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (r2Res.ok) {
      const data = await r2Res.json();
      if (data.success && data.url) {
        return { url: data.url, error: null };
      }
    } else {
      const data = await r2Res.json().catch(() => null);
      if (data && data.error && !data.error.includes("credentials not configured")) {
        return { url: null, error: data.error };
      }
    }
  } catch {
    // R2 API failed or endpoint unreachable, attempt fallback to Supabase if configured
  }

  // 2. Fallback to Supabase Storage if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("harmony-files")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from("harmony-files")
          .getPublicUrl(data.path);
        return { url: publicUrlData.publicUrl, error: null };
      }
    } catch {
      // Ignore and report configuration message below
    }
  }

  return {
    url: null,
    error:
      "Cloudflare R2 storage credentials not set. Please add R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY to .env.local or Vercel.",
  };
}
