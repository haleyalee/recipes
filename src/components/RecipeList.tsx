"use client";

import React, { useEffect, useState } from 'react';
import { fetchFilteredRecipes } from '@/utils/apiHelper';
import { Recipe } from '@/lib/definitions';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[],
  selectedCategories: string[]
}
export default function RecipeList({ recipes, selectedCategories } : RecipeListProps ) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  // Filter recipes dynamically by category
  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await fetchFilteredRecipes(selectedCategories);
      setFilteredRecipes(recipes);
    }

    if (selectedCategories.length > 0) {
      fetchRecipes();
    } else {
      // Optionally, load all recipes if no filter is selected
      setFilteredRecipes(recipes); 
    }
  }, [recipes, selectedCategories]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {filteredRecipes?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
