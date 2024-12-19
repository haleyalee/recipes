import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RecipeDetails } from '@/lib/definitions';

/*
 *  GET /api/recipes - Fetch all recipes
 *  @return [{ id: 0, name: "Recipe Name"}, ...]
 */
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return NextResponse.json({ error: "Failed to fetch all recipes" }, { status: 500 });
  }
}

/*
 *  POST /api/recipes - Add a new recipe
 *  Request body: {
 *    name: "New Recipe",
 *    categories: ["category"],
 *    ingredients: ["new ingredient"],
 *    instructions: ["instruction"],
 *    notes: "New note"
 *  }
 */
export async function POST(request: Request) {
  const { name, categories, ingredients, instructions, notes }: RecipeDetails = await request.json();
  const client = await pool.connect();
  
  if (!name || !categories || !ingredients || !instructions) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await client.query("BEGIN");

    // Insert into recipes
    const recipeResult = await client.query(
      "INSERT INTO recipes (name) VALUES ($1) RETURNING id",
      [name]
    );
    const recipeId = recipeResult.rows[0].id;

    // Insert instructions/notes
    await client.query(
      "INSERT INTO recipe_data (recipe_id, instructions, notes) VALUES ($1, $2, $3)",
      [recipeId, instructions, notes]
    );

    // Handle categories
    for (const c of categories) {
      // Check if the category already exists
      let categoryResult = await client.query(
        "SELECT id FROM categories WHERE name = $1",
        [c]
      );

      // If the category doesn't exist, create it
      if (categoryResult.rows.length === 0) {
        const insertCategoryResult = await client.query(
          "INSERT INTO categories (name) VALUES ($1) RETURNING id",
          [c]
        );
        categoryResult = insertCategoryResult;
      }

      const categoryId = categoryResult.rows[0].id;

      // Link category to the recipe
      await client.query(
        "INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)",
        [recipeId, categoryId]
      );
    }

    // Handle ingredients
    for (const ingredient of ingredients) {
      // Check if the ingredient already exists
      let ingredientResult = await client.query(
        "SELECT id FROM ingredients WHERE name = $1",
        [ingredient]
      );

      // If the ingredient doesn't exist, create it
      if (ingredientResult.rows.length === 0) {
        const insertIngredientResult = await client.query(
          "INSERT INTO ingredients (name) VALUES ($1) RETURNING id",
          [ingredient]
        );
        ingredientResult = insertIngredientResult;
      }

      const ingredientId = ingredientResult.rows[0].id;

      // Link ingredient to the recipe
      await client.query(
        "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ($1, $2)",
        [recipeId, ingredientId]
      );
    }

    await client.query("COMMIT");

    return NextResponse.json({ message: "Recipe added successfully", recipeId }, { status: 201 });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    return NextResponse.json({ error: "Failed to add recipe" }, { status: 500 });
  } finally {
    client.release();
  }
}
