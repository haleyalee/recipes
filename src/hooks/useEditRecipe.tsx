import { RecipeDetails } from "@/lib/definitions";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { getSlugFromName } from "@/utils/helper";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export const useEditRecipe = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();

  // PUT /api/recipes/[id]
  const editRecipe = async (recipeData: RecipeDetails) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!recipeData.name) throw new Error("Recipe name is required to generate an ID");
    const id = getSlugFromName(recipeData.name);

    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setSuccess(true);
      router.push(`/recipes/${id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while editing the recipe");
      console.error("Error editing recipe: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { editRecipe, loading, error, success };
}