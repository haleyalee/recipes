"use client";

import React, { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import CategoryPill from "@/components/CategoryPill";
import PageHeader from "@/components/PageHeader";
import RedirectButton from "@/components/RedirectButton";
import { useRecipe } from "@/hooks/useRecipe";

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps ) {
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const { recipe, error: recipeError, loading } = useRecipe(slug);

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

  // TODO: implement loading page
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error fetching params: {error}</div>;
  if (recipeError) return <div className="error-message">Error fetching recipe: {recipeError}</div>;
  if (!recipe) return <div className="error-message">Recipe not found.</div>;

  return (
    <div>
      <BackButton>Back to All Recipes</BackButton>
      <div className="mb-8">
        <div className="flex flex-row justify-between mb-4">
          <PageHeader>{recipe.name}</PageHeader>
          <RedirectButton path={`${slug}/edit`}>Edit Recipe</RedirectButton>
        </div>
        <div className="flex flex-row gap-2">
          {recipe.categories?.map((cat, idx) => 
            <CategoryPill key={`${slug}-${idx}`} category={cat}/>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-4">Instructions</h2>
        <ol className="list-decimal pl-6">
          {recipe.instructions?.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ol>
      </div>
      { recipe.notes && 
        <div>
          <h2 className="text-xl font-semibold mt-4">Notes</h2>
          <p>{recipe.notes}</p>
        </div>
      }
    </div>
  );
}
