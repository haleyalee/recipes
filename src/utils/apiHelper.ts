export async function fetchFilteredRecipes(selectedCategories: string[]) {
  try {
    const response = await fetch('/api/recipes/filter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedCategories }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch filtered recipes');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching filtered recipes:', error);
    return [];
  }
}
