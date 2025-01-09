import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div 
      className="border rounded-lg shadow hover:shadow-lg flex flex-col place-content-between transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg min-h-[250px] xl:min-h-[350px]">
        { recipeData.image ? (
         <Image
          src={recipeData.image}
          alt={recipe.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        ) : (
          <div className="bg-stone-300 w-full h-full"></div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-md font-bold mb-1">{recipe.name}</h2>
        <div className="flex flex-wrap gap-1 mb-3">
          {recipeData?.categories?.map((cat, idx) => 
            <CategoryPill key={idx} category={cat} />
          )}
        </div>
        <div className="flex justify-end">
          <Link
            href={`/recipes/${slug}`}
            className="mt-3 hover:underline text-linkGreen text-xs"
          >
            View Recipe &gt;
          </Link>
      </div>
      </div>
    </div>
  );
}
