import { recipeData, recipes } from "../lib/placeholder-data";

const getPathFromName = (recipeName: string) => {
  return recipeName.toLowerCase().replace(/\s/g, "-");
};

const getCategoryForRecipe = (slug: string): string[] => {
  const recipeName = recipeData[slug]?.name;
  const recipe = recipes.find((r) => r.name === recipeName);
  return recipe ? recipe.category : [];
}

const capitalizeFirstLetter = (s: string): string => {
  return s[0].toUpperCase() + s.slice(1);
}

export { 
  getPathFromName, 
  getCategoryForRecipe, 
  capitalizeFirstLetter 
};

