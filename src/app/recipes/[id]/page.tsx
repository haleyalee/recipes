import { recipeData } from "@/src/lib/placeholder-data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const recipe = recipeData[id];

  if (!recipe) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
        <Link href={`${id}/edit`} className="hover:underline text-blue-500">Edit Recipe</Link>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Ingredients:</h2>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-4">Instructions:</h2>
        <ol className="list-decimal pl-6">
          {recipe.instructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ol>
      </div>
      { recipe.notes && 
        <div>
          <h2 className="text-xl font-semibold mt-4">Notes:</h2>
          <p>{recipe.notes}</p>
        </div>
      }
    </div>
  );
}
