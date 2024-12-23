import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export const useDeleteRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // DELETE /api/recipes/[id]
  const deleteRecipe = async (recipeId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting the recipe"
      );
      console.error("Error deleting recipe: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteRecipe, loading, error, success };
};
