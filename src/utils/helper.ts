import { Recipe, RecipeDetails } from "../lib/definitions";
import { categories, recipeData, recipes } from "../lib/placeholder-data";

const getSlugFromName = (recipeName: string): string => {
  return recipeName.toLowerCase().replace(/ /g, "-");
};

const getRecipeDetailsByName = (name: string): RecipeDetails | undefined => {
  const slug = getSlugFromName(name);
  return recipeData[slug];
}

const addRecipe = (newRecipe: Recipe, newRecipeDetails: RecipeDetails) => {
  const slug = getSlugFromName(newRecipe.name);
  // Add to recipes array
  recipes.push(newRecipe);
  // Add to recipeData
  recipeData[slug] = newRecipeDetails;
}

const capitalizeFirstLetter = (s: string): string => {
  return s[0].toUpperCase() + s.slice(1);
}

const addCategory = (newCategory: string) => {
  if (!categories.includes(newCategory)) {
    categories.push(newCategory);
  }
};

export { 
  getSlugFromName, 
  getRecipeDetailsByName,
  addRecipe,
  addCategory,
  capitalizeFirstLetter 
};

