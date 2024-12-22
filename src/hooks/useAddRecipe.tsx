import { RecipeDetails } from "@/lib/definitions";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export const useAddRecipe = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();

  // POST /api/recipes
  const addRecipe = async (recipeData: RecipeDetails) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setSuccess(true);

      if (window.history.length > 1) {
        router.back();
      } else {
        router.push('/recipes');
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while adding the recipe");
      console.error("Error adding recipe: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { addRecipe, loading, error, success };
}