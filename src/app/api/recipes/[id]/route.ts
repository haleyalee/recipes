import { NextResponse } from 'next/server';
import { recipes, recipeData, categories } from '@/lib/db'; // Adjust based on your file locations
import { RecipeDetails } from '@/lib/definitions'; // Adjust based on your data types
import { getSlugFromName } from '@/utils/helper';

// GET /api/recipes/[id] - Fetch a specific recipe by ID
export async function GET(request: Request, context: { params: { id: string } } ) {
  const { id: slug } = context.params;

  try {
    const recipe = recipeData[slug];

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

// PUT /api/recipes/[id] - Update a specific recipe
export async function PUT(request: Request, context: { params: { id: string } } ) {
  const { id } = context.params;
  console.log("id: ", id);

  try {
    const { name, category, ingredients, instructions, notes }: RecipeDetails = await request.json();
    const recipe = recipeData[id];

    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
    }

    // Update recipe metadata
    recipe.name = name;

    // Update recipe data
    const slug = getSlugFromName(name);
    recipeData[slug] = { name, category, ingredients, instructions, notes };

    // Update categories list (if the category is new)
    category.forEach(c => {
      if (!categories.includes(c)) {
        categories.push(c);
        console.log(`New category added: ${c}`);
      }
    })

    return NextResponse.json(recipe, { status: 200 });

  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
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
