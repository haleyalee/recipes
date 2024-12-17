type FormType = "add" | "edit";

// Recipe metadata (basic details)
interface Recipe {
  id: number,
  name: string
}

// Recipe data (detailed information for each recipe)
type RecipeDetails = {
  name: string;
  category: string[];
  ingredients: string[];
  instructions: string[];
  notes?: string;
}

// Mapping recipe slugs to detailed data
interface RecipeData {
  [key: string]: RecipeDetails
}

// Organizes recipes by category (tagged recipes)
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
