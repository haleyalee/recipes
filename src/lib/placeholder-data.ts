import { Recipe, RecipeData } from "./definitions";

const recipes: Recipe[] = [
  { id: 1, name: "Spaghetti Carbonara", category: ["dinner", "italian"] },
  { id: 2, name: "Chocolate Cake", category: ["dessert"] },
];

const recipeData: RecipeData = {
  "spaghetti-carbonara": { name: "Spaghetti Carbonara", ingredients: ["Spaghetti", "Eggs", "Parmesan"], instructions: ["Cook pasta", "Mix ingredients."], notes: "Bucatini is my favorite noodle :-)" },
  "chocolate-cake": { name: "Chocolate Cake", ingredients: ["Flour", "Cocoa", "Sugar"], instructions: ["Mix", "Bake", "Enjoy!"] },
};

const categories = ["italian", "dinner", "dessert"];

export { recipes, recipeData, categories };