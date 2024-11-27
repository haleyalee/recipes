import RecipeForm from "@/src/components/RecipeForm";
import { recipeData } from "@/src/lib/placeholder-data";

interface EditRecipeFormProps {
  params: Promise<{ id:string }>
}

export default async function EditRecipeForm({ params }: EditRecipeFormProps ) {
  const id = (await params).id;
  const recipe = recipeData[id];
  
  return (
    <RecipeForm type="edit" data={recipe} />
  );
}
