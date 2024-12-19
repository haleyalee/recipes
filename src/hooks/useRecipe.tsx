import { RecipeDetails } from "@/lib/definitions";
import { getSlugFromName } from "@/utils/helper";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export const useRecipe = (name: string) => {
  const [recipe, setRecipe] = useState<RecipeDetails>({
    name: "",
    categories: [],
    ingredients: [],
    instructions: []  
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const slug = getSlugFromName(name);

  // GET /api/recipes/[id]
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/recipes/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch recipe.");
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError (error instanceof Error ? error.message : "An error occurred while fetching recipe");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchRecipe();
    }
  }, [slug]);

  return { recipe, loading, error };
}