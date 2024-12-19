import { Recipe } from "@/lib/definitions";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // GET /api/recipes
  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/recipes`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError (error instanceof Error ? error.message : "An error occurred while fetching recipes");
        console.error('Error fetching recipes:', error); // Log error to console
      }
    };

    fetchAllRecipes();
  }, []);

  return { recipes, loading, error };
}