import { NextResponse } from 'next/server';
import pool from '@/lib/db';


/*
 *  GET /api/categories - Get all categories
 *  @returns ["dinner", "dessert", ...]
 */
export async function GET() {
  try {
    // Fetch all categories from the database
    const result = await pool.query('SELECT * FROM categories');

    const categories = result.rows.map(c => c.name);
    // Return the categories in the response
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/*
 *  POST /api/categories - Add a new category
 */
export async function POST(request: Request) {
  try {
    const { category } = await request.json();

    // Check if the category already exists in the database
    const existingCategory = await pool.query(
      'SELECT * FROM categories WHERE name = $1',
      [category]
    );

    if (existingCategory.rows.length > 0) {
      return NextResponse.json({ message: "Category already exists" }, { status: 400 });
    }

    // Insert the new category into the database
    const result = await pool.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [category]
    );

    // Return the newly created category
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// TODO: DELETE category if no recipes have it as a category