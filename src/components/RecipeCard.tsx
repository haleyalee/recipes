import React from "react";
import Link from "next/link";
import { Recipe } from "@/lib/definitions";
import { getSlugFromName } from "@/utils/helper";
import CategoryPill from "./CategoryPill";
import { useRecipe } from "@/hooks/useRecipe";

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const slug = getSlugFromName(recipe.name);
  const { recipe: recipeData } = useRecipe(slug);

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg flex flex-col place-content-between">
      <div>
        <h2 className="text-md font-bold mb-1">{recipe.name}</h2>
        <div className="flex flex-wrap gap-1 mb-3">
          {recipeData?.categories?.map((cat, idx) => 
            <CategoryPill key={idx} category={cat} />
          )}
        </div>
      </div>
      <Link 
        href={`/recipes/${slug}`} 
        className="mt-3 hover:underline text-linkGreen text-xs text-right"
      >
        View Recipe &gt;
      </Link>
    </div>
  );
}
