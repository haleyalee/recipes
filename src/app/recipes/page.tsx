"use client";

import { categories, recipes } from "@/src/lib/placeholder-data";
import RecipeCard from "../../components/RecipeCard";
import CategoryPill from "@/src/components/CategoryPill";
import { useEffect, useState } from "react";
import { Recipe } from "@/src/lib/definitions";
import RedirectButton from "@/src/components/RedirectButton";
import PageHeader from "@/src/components/PageHeader";

export default function RecipeListPage() {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  // Filter recipes by category
  useEffect(() => {
    console.log("New selected categories: ", selectedCategories);
    const filter = selectedCategories.length > 0
      ? recipes.filter((recipe) =>
        recipe.category.some((cat) => selectedCategories.includes(cat))
        )
      : recipes;
    setFilteredRecipes(filter);
  }, [selectedCategories]);

  const toggleCategory = (category: string) => {
    console.log("Toggle category ", category);

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove category if already selected
        : [...prev, category] // Add category if not selected
    );
  };

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <PageHeader>All Recipes</PageHeader>
        <RedirectButton path="add-recipe">+ Recipe</RedirectButton>
      </div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        { categories.map((c, idx) => 
          <CategoryPill key={idx} category={c} toggleCategory={toggleCategory} />
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
