import { recipes } from "@/src/lib/placeholder-data";
import RecipeCard from "../../components/RecipeCard";
import Link from "next/link";

export default function RecipeListPage() {
  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-2xl font-bold">All Recipes</h1>
        <Link 
          href={`add-recipe`} 
          className="flex rounded-full px-4 py-2 text-white items-center bg-linkGreen hover:bg-hoverGreen shadow-sm"
        >
          + Recipe
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
