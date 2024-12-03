"use client";

import { useState } from "react";
import { categories } from "@/lib/db";
import RecipeCard from "@/components/RecipeCard";
import CategoryPill from "@/components/CategoryPill";
import RedirectButton from "@/components/RedirectButton";
import PageHeader from "@/components/PageHeader";
import { getRecipeDetailsByName } from "@/utils/helper";
import { useRecipes } from "@/hooks/useRecipes";

export default function RecipeListPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { recipes, error } = useRecipes();

  // Filter recipes dynamically by category
  const filteredRecipes = selectedCategories.length > 0
    ? recipes.filter((recipe) => {
        const recipeDetails = getRecipeDetailsByName(recipe.name);
        return recipeDetails?.category.some((cat) => selectedCategories.includes(cat));
      })
    : recipes;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove category if already selected
        : [...prev, category] // Add category if not selected
    );
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}

      <div className="flex flex-row justify-between mb-4">
        <PageHeader>All Recipes</PageHeader>
        <RedirectButton path="add-recipe">+ Recipe</RedirectButton>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        { categories.map((c, idx) => 
          <CategoryPill 
            key={idx} 
            category={c} 
            isSelected={selectedCategories.includes(c)}
            toggleCategory={toggleCategory} 
          />
        )}
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
