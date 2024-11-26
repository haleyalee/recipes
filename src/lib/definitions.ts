type FormType = "add" | "edit";

interface Recipe {
  id: number,
  name: string,
  category: string
}

type RecipeDetails = {
  name: string;
  ingredients: string[];
  instructions: string[];
}


interface RecipeData {
  [key: string]: RecipeDetails
}

interface RecipeForm {
  data?: RecipeDetails;
  type: FormType;
}

export type { Recipe, RecipeDetails, RecipeData, RecipeForm };
