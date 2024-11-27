type FormType = "add" | "edit";

interface Recipe {
  id: number,
  name: string,
  category: string[]
}

type RecipeDetails = {
  name: string;
  ingredients: string[];
  instructions: string[];
  notes?: string;
}

interface RecipeData {
  [key: string]: RecipeDetails
}

interface TagData {
  [category: string]: RecipeDetails[]
}

export type { 
  Recipe, 
  RecipeDetails, 
  RecipeData, 
  FormType, 
  TagData 
};
