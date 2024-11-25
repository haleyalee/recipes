import { recipeData } from "@/src/lib/placeholder-data";
import { notFound } from "next/navigation";

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const recipe = recipeData[id];

  if (!recipe) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <h2 className="text-xl font-semibold">Ingredients:</h2>
      <ul className="list-disc pl-6">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-4">Instructions:</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
}
