import { Recipe, RecipeData } from "./definitions";

const recipes: Recipe[] = [
  { id: 1, name: "Spaghetti Carbonara", category: ["Dinner", "Italian"] },
  { id: 2, name: "Chocolate Cake", category: ["Dessert"] },
];

const recipeData: RecipeData = {
  "spaghetti-carbonara": { name: "Spaghetti Carbonara", ingredients: ["Spaghetti", "Eggs", "Parmesan"], instructions: ["Cook pasta", "Mix ingredients."], notes: "Bucatini is my favorite noodle :-)" },
  "chocolate-cake": { name: "Chocolate Cake", ingredients: ["Flour", "Cocoa", "Sugar"], instructions: ["Mix", "Bake", "Enjoy!"] },
};

const categories = ["Italian", "Dinner", "Dessert"];

export { recipes, recipeData, categories };