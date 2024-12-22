import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getNameFromSlug } from '@/utils/helper';

/*
 *  GET /api/recipes/[id] - Fetch a specific recipe by ID
 *  Response Body:
 *  {
 *    "name": "Recipe Name",
 *    "categories": ["category", ...],
 *    "ingredients": ["ingredient", ...],
 *    "instructions": ["instruction", ...],
 *    "notes": "Notes"
 *  }
 */

export async function GET(request: Request, context: { params: { id: string } } ) {
  const { id: slug } = context.params;
  const name = getNameFromSlug(slug);

  try {
    const recipeResult = await pool.query(
      'SELECT * FROM recipes WHERE name = $1',
      [name]
    );

    if (recipeResult.rows.length === 0) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    const recipe = recipeResult.rows[0];

    // Fetch recipe data associated with the recipe
    const recipeDataResult = await pool.query(
      'SELECT * FROM recipe_data WHERE recipe_id = $1',
      [recipe.id]
    );

    // Fetch categories associated with the recipe
    const categoriesResult = await pool.query(
      'SELECT c.name FROM categories c INNER JOIN recipe_categories rc ON rc.category_id = c.id WHERE rc.recipe_id = $1',
      [recipe.id]
    );

    // Fetch ingredients associated with the recipe
    const ingredientsResult = await pool.query(
      'SELECT i.name FROM ingredients i INNER JOIN recipe_ingredients ri ON ri.ingredient_id = i.id WHERE ri.recipe_id = $1',
      [recipe.id]
    );

    const recipeData = recipeDataResult.rows[0];
    const instructions = recipeData.instructions;
    const notes = recipeData.notes;
    const categories = categoriesResult.rows.map(row => row.name);
    const ingredients = ingredientsResult.rows.map(row => row.name);

    // Construct the full recipe object
    const fullRecipe = {
      ...recipe,
      categories,
      ingredients,
      instructions,
      notes,
    };

    return NextResponse.json(fullRecipe, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

/*
 *  PUT /api/recipes/[id] - Update a specific recipe by slug
 *  Request Body:
 *  {
 *    "name": "New Recipe Name",
 *    "categories": ["new category", ...],
 *    "ingredients": ["new ingredient", ...],
 *    "instructions": ["new instruction", ...],
 *    "notes": "Updated notes"
 *  }
 */
export async function PUT(request: Request, context: { params: { id: string } }) {
  const { id: slug } = context.params;
  const name = getNameFromSlug(slug);

  try {
    const body = await request.json();
    const { name: newName, categories, ingredients, instructions, notes } = body;

    // Fetch the recipe ID based on the current name
    const recipeResult = await pool.query(
      'SELECT * FROM recipes WHERE name = $1',
      [name]
    );

    if (recipeResult.rows.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const recipe = recipeResult.rows[0];
    const recipeId = recipe.id;

    // Update the recipe name
    if (newName && newName !== recipe.name) {
      await pool.query(
        'UPDATE recipes SET name = $1 WHERE id = $2',
        [newName, recipeId]
      );
    }

    // Update instructions and notes
    await pool.query(
      'UPDATE recipe_data SET instructions = $1, notes = $2 WHERE recipe_id = $3',
      [instructions, notes, recipeId]
    );

    // Update categories
    if (categories && categories.length > 0) {
      // Delete existing categories
      await pool.query(
        'DELETE FROM recipe_categories WHERE recipe_id = $1',
        [recipeId]
      );

      // Add new categories
      for (const category of categories) {
        const categoryResult = await pool.query(
          'SELECT id FROM categories WHERE name = $1',
          [category]
        );

        let categoryId;

        if (categoryResult.rows.length > 0) {
          categoryId = categoryResult.rows[0].id;
        } else {
          const insertCategory = await pool.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING id',
            [category]
          );
          categoryId = insertCategory.rows[0].id;
        }

        await pool.query(
          'INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)',
          [recipeId, categoryId]
        );
      }
    }

    // Update ingredients
    if (ingredients && ingredients.length > 0) {
      // Delete existing ingredients
      await pool.query(
        'DELETE FROM recipe_ingredients WHERE recipe_id = $1',
        [recipeId]
      );

      // Add new ingredients
      for (const ingredient of ingredients) {
        const ingredientResult = await pool.query(
          'SELECT id FROM ingredients WHERE name = $1',
          [ingredient]
        );

        let ingredientId;

        if (ingredientResult.rows.length > 0) {
          ingredientId = ingredientResult.rows[0].id;
        } else {
          const insertIngredient = await pool.query(
            'INSERT INTO ingredients (name) VALUES ($1) RETURNING id',
            [ingredient]
          );
          ingredientId = insertIngredient.rows[0].id;
        }

        await pool.query(
          'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ($1, $2)',
          [recipeId, ingredientId]
        );
      }
    }

    return NextResponse.json({ message: "Recipe updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


/*
 *  DELETE /api/recipes/[id] - Delete a specific recipe by slug
 *  @returns { message: "Recipe deleted successfully" } or { error: "..." }
 */
export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id: slug } = context.params;
  const name = getNameFromSlug(slug);

  try {
    // Fetch the recipe by name
    const recipeResult = await pool.query(
      'SELECT id FROM recipes WHERE name = $1',
      [name]
    );

    if (recipeResult.rows.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const recipeId = recipeResult.rows[0].id;

    // Delete related data first (categories, ingredients, recipe data)
    await pool.query('DELETE FROM recipe_categories WHERE recipe_id = $1', [recipeId]);
    await pool.query('DELETE FROM recipe_ingredients WHERE recipe_id = $1', [recipeId]);
    await pool.query('DELETE FROM recipe_data WHERE recipe_id = $1', [recipeId]);

    // Delete the recipe itself
    await pool.query('DELETE FROM recipes WHERE id = $1', [recipeId]);

    return NextResponse.json({ message: "Recipe deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
