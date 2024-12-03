import { NextResponse } from 'next/server';
import { recipes, recipeData } from '@/lib/db'; // Adjust based on your file locations
import { Recipe, RecipeDetails } from '@/lib/definitions'; // Adjust based on your data types
import { getSlugFromName } from '@/utils/helper';

// GET /api/recipes/[id] - Fetch a specific recipe by ID
export async function GET({ params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id);

  // Find the recipe by ID
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  if (recipe) {
    return NextResponse.json(recipe); // Return the found recipe
  } else {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 }); // Handle case where recipe is not found
  }
}

// PUT /api/recipes/[id] - Update a specific recipe
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, category, ingredients, instructions, notes }: RecipeDetails = await request.json();

  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
  }

  // Update recipe metadata
  recipe.name = name;

  // Update recipe data
  const slug = name.toLowerCase().replace(/ /g, "-");
  recipeData[slug] = { name, category, ingredients, instructions, notes };

  return NextResponse.json(recipe, { status: 200 });
}

// DELETE /api/recipes/[id] - Delete a specific recipe
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === parseInt(id));

  if (recipeIndex === -1) {
    return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
  }

  // Remove from recipes array
  const [deletedRecipe] = recipes.splice(recipeIndex, 1);

  // Remove recipe data
  const slug = getSlugFromName(deletedRecipe.name);
  delete recipeData[slug];

  return NextResponse.json({ message: "Recipe deleted successfully" });
}
