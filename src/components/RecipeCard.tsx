import Link from "next/link";
import { Recipe } from "../lib/definitions";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const path = recipe.name.toLowerCase().replace(/\s/g, "-");
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <h2 className="text-xl font-bold">{recipe.name}</h2>
      <p className="text-gray-600">{recipe.category}</p>
      <Link href={`/recipes/${path}`}>View Recipe</Link>
    </div>
  );
}
