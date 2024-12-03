import { NextResponse } from 'next/server';
import { categories } from '@/lib/placeholder-data'; // Adjust your import path

// GET /api/categories - Get all categories
export async function GET() {
  return NextResponse.json(categories);
}

// POST /api/categories - Add a new category
export async function POST(request: Request) {
  const { category } = await request.json();

  // Check if category already exists
  if (categories.includes(category)) {
    return NextResponse.json({ message: "Category already exists" }, { status: 400 });
  }

  // Add new category
  categories.push(category);

  return NextResponse.json({ category }, { status: 201 });
}
