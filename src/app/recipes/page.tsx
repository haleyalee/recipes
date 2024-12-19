"use client";

import React, { useState } from "react";
import CategoryPill from "@/components/CategoryPill";
import RedirectButton from "@/components/RedirectButton";
import PageHeader from "@/components/PageHeader";
import { useRecipes } from "@/hooks/useRecipes";
import { useCategories } from "@/hooks/useCategories";
import RecipeList from "@/components/RecipeList";

export default function RecipeListPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { recipes, error } = useRecipes();
  const { categories } = useCategories();

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

      {/* TODO: sort category pills alphabetically? */}
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
      <RecipeList recipes={recipes} selectedCategories={selectedCategories} />
    </div>
  );
}
