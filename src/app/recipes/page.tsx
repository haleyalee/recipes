import { recipes } from "@/src/lib/placeholder-data";
import RecipeCard from "../../components/RecipeCard";

export default function RecipeListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
