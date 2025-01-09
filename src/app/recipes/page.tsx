"use client";

import React, { useState } from "react";
import { useRecipes } from "@/hooks/useRecipes";
import { useCategories } from "@/hooks/useCategories";
import PageHeader from "@/components/PageHeader";
import RecipeList from "@/components/RecipeList";
import CategoryPill from "@/components/CategoryPill";
import RedirectButton from "@/components/buttons/RedirectButton";
import AddIcon from "@/components/icons/AddIcon";
import SearchBar from "@/components/SearchBar";
import RecipeImage from "@/components/RecipeImage";
import Link from "next/link";

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
    <div className="flex flex-col w-screen md:flex-row gap-0 md:gap-8">
      {/* <RecipeImage/> */}
      <div className="w-full h-auto overflow-y-auto pt-4 px-8 pb-12">
        <div className="flex flex-row items-center justify-end gap-2 h-10 mb-2 md:mb-0">
          <SearchBar />
          <RedirectButton path="add-recipe">
            <AddIcon />
          </RedirectButton>
        </div>

        <Link href="/">
          <PageHeader>Recipes</PageHeader>
        </Link>

        {/* Category Filters */}
        {/* TODO: sort category pills alphabetically? */}
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
        <div className="mt-12">
          {error && <div className="error-message">{error}</div>}
          <RecipeList recipes={recipes} selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}
