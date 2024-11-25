import { Recipe, RecipeData } from "./definitions";

const recipes: Recipe[] = [
    { id: 1, name: "Spaghetti Carbonara", category: "Dinner" },
    { id: 2, name: "Chocolate Cake", category: "Dessert" },
];

const recipeData: RecipeData = {
    "spaghetti-carbonara": { name: "Spaghetti Carbonara", ingredients: ["Spaghetti", "Eggs", "Parmesan"], instructions: "Cook pasta, mix ingredients." },
    "chocolate-cake": { name: "Chocolate Cake", ingredients: ["Flour", "Cocoa", "Sugar"], instructions: "Mix, bake, and enjoy!" },
};



export { recipes, recipeData };