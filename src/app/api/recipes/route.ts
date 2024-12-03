import { NextResponse } from 'next/server';
import { recipes, recipeData } from '@/lib/db';
import { Recipe, RecipeDetails } from '@/lib/definitions';
import { getSlugFromName } from '@/utils/helper';

// GET /api/recipes - Fetch all recipes
export async function GET() {
  try {
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return NextResponse.json({ error: "Failed to fetch all recipes" }, { status: 500 });
  }
}

// POST /api/recipes - Add a new recipe
export async function POST(request: Request) {
  const { name, category, ingredients, instructions, notes }: RecipeDetails = await request.json();

  // Create new recipe and generate slug
  const slug = getSlugFromName(name);

  // Ensure recipe name is unique
  if (recipeData[slug]) {
    return NextResponse.json({ message: "Recipe already exists" }, { status: 400 });
  }

  // Add the recipe data to the arrays
  const newRecipe: Recipe = {
    id: recipes.length + 1,
    name
  };

  // Add new recipe to recipes and recipeData
  recipes.push(newRecipe);
  recipeData[slug] = { name, category, ingredients, instructions, notes };

  return NextResponse.json(newRecipe, { status: 201 });
}
