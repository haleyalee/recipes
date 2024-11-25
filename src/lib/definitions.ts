interface Recipe {
  id: number,
  name: string,
  category: string
}

interface RecipeData {
  [key: string]: {
    name: string,
    ingredients: string[],
    instructions: string
  }
}

export type { Recipe, RecipeData };
