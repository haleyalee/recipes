import { supabase } from "@/lib/storage/supabaseClient";

export async function deleteFileFromBucket(imageUrl: string) {
  const filePath = imageUrl.split('/storage/v1/object/public/')[1]; // Extract path from URL
  console.log("filePath", filePath);
  
  const { error } = await supabase.storage
    .from('recipe-images')
    .remove([filePath]);

  if (error) {
    console.error('Error deleting file from bucket:', error.message);
    throw new Error('Failed to delete file from storage');
  }
}