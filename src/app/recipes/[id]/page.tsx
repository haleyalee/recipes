"use client";

import React, { useState, useEffect } from "react";
import BackButton from "@/components/buttons/BackButton";
import CategoryPill from "@/components/CategoryPill";
import PageHeader from "@/components/PageHeader";
import RedirectButton from "@/components/buttons/RedirectButton";
import { useRecipe } from "@/hooks/useRecipe";
import DeleteRecipeButton from "@/components/buttons/DeleteRecipeButton";
import EditIcon from "@/components/icons/EditIcon";
import PageSubheader from "@/components/PageSubheader";
import RecipeImage from "@/components/RecipeImage";

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
    <div className="flex flex-col w-screen md:flex-row gap-0 md:gap-8">
      <RecipeImage />
      <div className="w-full md:w-8/12 lg:w-9/12 h-auto overflow-y-auto p-4 pb-12">
        <div className="flex flex-row justify-between mb-8">
          <BackButton>Back to All Recipes</BackButton>
          <div className="flex flex-row gap-1">
              <RedirectButton path={`${slug}/edit`}>
                <EditIcon />
              </RedirectButton>
              <DeleteRecipeButton slug={slug} />
            </div>
        </div>

        <div className="mb-12">
          <PageHeader>{recipe.name}</PageHeader>  
          <div className="flex flex-row gap-2">
            {recipe.categories?.map((cat, idx) => 
              <CategoryPill key={`${slug}-${idx}`} category={cat}/>
            )}
          </div>
        </div>
        <div>
          <PageSubheader>Ingredients</PageSubheader>
          <ul className="list-disc pl-6">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="pl-2">{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <PageSubheader>Instructions</PageSubheader>
          <ol className="list-decimal pl-6">
            {recipe.instructions?.map((instruction, i) => (
              <li key={i} className="pl-2">{instruction}</li>
            ))}
          </ol>
        </div>
        { recipe.notes && 
          <div>
            <PageSubheader>Notes</PageSubheader>
            <p>{recipe.notes}</p>
          </div>
        }
      </div>
    </div>
  );
}
