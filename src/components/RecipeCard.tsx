import Link from "next/link";
import { Recipe } from "../lib/definitions";
import { getPathFromName } from "../utils/helper";
import CategoryPill from "./CategoryPill";

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const path = getPathFromName(recipe.name);
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg flex flex-col place-content-between">
      <div>
        <h2 className="text-md font-bold mb-1">{recipe.name}</h2>
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.category.map((cat, idx) => 
            <CategoryPill key={idx} category={cat} />
          )}
        </div>
      </div>
      <Link 
        href={`/recipes/${path}`} 
        className="mt-3 hover:underline text-linkGreen text-xs text-right"
      >
        View Recipe
      </Link>
    </div>
  );
}
