import { supabase } from "@/lib/supabaseClient";

export const uploadImage = async (file: File): Promise<{ publicURL: string | null; error: string | null }> => {
  const fileName = `${Date.now()}-${file.name}`; // Generate a unique filename

  try {
    // Upload the image to Supabase
    const { error: uploadError } = await supabase.storage
      .from("recipe-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      return { publicURL: null, error: `Upload failed: ${uploadError.message}` };
    }

    // Get the public URL of the uploaded image
    const { data } = supabase.storage
      .from("recipe-images")
      .getPublicUrl(fileName);

    if (!data?.publicUrl) {
      console.error("Failed to get public URL");
      return { publicURL: null, error: "Failed to get public URL" };
    }

    return { publicURL: data.publicUrl, error: null };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { publicURL: null, error: error instanceof Error ? error.message : "An unknown error occurred" };
  }
};
