import BackButton from "@/src/components/BackButton";
import CategoryPill from "@/src/components/CategoryPill";
import PageHeader from "@/src/components/PageHeader";
import RedirectButton from "@/src/components/RedirectButton";
import { recipeData } from "@/src/lib/placeholder-data";
import { getCategoryForRecipe } from "@/src/utils/helper";
import { notFound } from "next/navigation";

interface RecipeDetailPageProps {
  params: Promise<{ id:string }>
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps ) {
  const slug = (await params).id;
  const recipe = recipeData[slug];

  if (!recipe) notFound();

  return (
    <div>
      <BackButton>Back to All Recipes</BackButton>
      <div className="mb-8">
        <div className="flex flex-row justify-between mb-4">
          <PageHeader>{recipe.name}</PageHeader>
          <RedirectButton path={`${slug}/edit`}>Edit Recipe</RedirectButton>
        </div>
        <div className="flex flex-row gap-2">
          {getCategoryForRecipe(slug)?.map((cat, idx) => 
            <CategoryPill key={`${slug}-${idx}`} category={cat}/>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-4">Instructions</h2>
        <ol className="list-decimal pl-6">
          {recipe.instructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ol>
      </div>
      { recipe.notes && 
        <div>
          <h2 className="text-xl font-semibold mt-4">Notes</h2>
          <p>{recipe.notes}</p>
        </div>
      }
    </div>
  );
}
