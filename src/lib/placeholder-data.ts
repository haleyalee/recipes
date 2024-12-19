import { Recipe, RecipeData } from "./definitions";

const recipes: Recipe[] = [
  { id: 1, name: "Spaghetti Carbonara" },
  { id: 2, name: "Chocolate Cake" },
];

const recipeData: RecipeData = {
  "spaghetti-carbonara": { 
    name: "Spaghetti Carbonara", 
    categories: ["dinner", "italian"],
    ingredients: ["Spaghetti", "Eggs", "Parmesan"], 
    instructions: ["Cook pasta", "Mix ingredients."], 
    notes: "Bucatini is my favorite noodle :-)"
  },
  "chocolate-cake": { 
    name: "Chocolate Cake", 
    categories: ["dessert"],
    ingredients: ["Flour", "Cocoa", "Sugar"], 
    instructions: ["Mix", "Bake", "Enjoy!"] 
  }
};

const categories = ["italian", "dinner", "dessert"];

export { recipes, recipeData, categories };