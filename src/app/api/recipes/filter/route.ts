import { NextResponse } from 'next/server';
import pool from '@/lib/db';

/*
 *  POST /api/recipes/filter - filter recipes on the server
 */
export async function POST(request: Request) {
  try {
    const { selectedCategories } = await request.json();

    if (!Array.isArray(selectedCategories) || selectedCategories.length === 0) {
      return NextResponse.json({ error: 'No categories provided' }, { status: 400 });
    }

    const query = `
      SELECT DISTINCT r.*
      FROM recipes r
      JOIN recipe_categories rc ON r.id = rc.recipe_id
      JOIN categories c ON rc.category_id = c.id
      WHERE c.name = ANY($1::text[])
    `;

    const result = await pool.query(query, [selectedCategories]);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching filtered recipes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
