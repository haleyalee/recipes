import React from "react";
import Link from "next/link";
import { Recipe } from "@/lib/definitions";
import { getSlugFromName } from "@/utils/helper";
import { recipeData } from "@/lib/placeholder-data";
import CategoryPill from "./CategoryPill";

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const slug = getSlugFromName(recipe.name);
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg flex flex-col place-content-between">
      <div>
        <h2 className="text-md font-bold mb-1">{recipe.name}</h2>
        <div className="flex flex-wrap gap-1 mb-3">
          {recipeData[slug]?.category.map((cat, idx) => 
            <CategoryPill key={idx} category={cat} />
          )}
        </div>
      </div>
      <Link 
        href={`/recipes/${slug}`} 
        className="mt-3 hover:underline text-linkGreen text-xs text-right"
      >
        View Recipe
      </Link>
    </div>
  );
}
