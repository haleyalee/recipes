"use client";

import React, { useState, useEffect } from "react";
import RecipeForm from "@/components/RecipeForm";
import { useRecipe } from "@/hooks/useRecipe";

interface EditRecipeFormProps {
  params: Promise<{ id:string }>
}

export default function EditRecipeForm({ params }: EditRecipeFormProps ) {
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    params
      .then((resolvedParams) => {
        setSlug(resolvedParams.id);
      })
      .catch((err) => {
        console.error("Failed to resolve params:", err);
        setError("Invalid or missing recipe ID.");
      });
  }, [params]);

  const { recipe } = useRecipe(slug);

  if (error) return <div className="error-message">Error fetching params: {error}</div>;

  return (
    <RecipeForm type="edit" data={recipe} />
  );
}
