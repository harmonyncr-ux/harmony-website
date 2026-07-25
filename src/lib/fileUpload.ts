import { supabase, isSupabaseConfigured } from "./supabaseClient";

export async function uploadHarmonyFile(
  file: File,
  folder: "newsletters" | "cvs" | "events" | "general" = "general"
): Promise<{ url: string | null; error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      url: null,
      error: "Supabase cloud credentials not set. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local or Vercel.",
    };
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("harmony-files")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      return { url: null, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from("harmony-files")
      .getPublicUrl(data.path);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || "Failed to upload file." };
  }
}
