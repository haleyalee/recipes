import Link from "next/link";
import { Recipe } from "../lib/definitions";
import { getPathFromName } from "../utils/helper";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const path = getPathFromName(recipe.name);
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <h2 className="text-xl font-bold">{recipe.name}</h2>
      {/* TODO: insert tags here instead */}
      <div className="rounded-full w-min px-3 bg-gray-200 mt-1 mb-3">
        <p>{recipe.category}</p>
      </div>
      <Link 
        href={`/recipes/${path}`} 
        className="hover:underline text-linkGreen"
      >
        View Recipe
      </Link>
    </div>
  );
}
