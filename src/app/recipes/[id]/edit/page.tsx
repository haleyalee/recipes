import RecipeForm from "@/src/components/RecipeForm";
import { recipeData } from "@/src/lib/placeholder-data";

export default async function EditRecipeForm({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const recipe = recipeData[id];
  
  return (
    <RecipeForm type="edit" data={recipe} />
  );
}
