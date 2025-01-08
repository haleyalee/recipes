export interface ValidationErrors {
  name?: string;
  categories?: string;
  ingredients?: string;
  instructions?: string;
  image?: string;
}

/*
 *  Recipe Form Validation
 *  
 *  Name - no special characters or numbers, force capitalize first letter of every word
 *  Categories - force lowercase every category, no special characters
 *  Ingredients - trim whitespace, remove empty lines
 *  Instructions - trim whitespace, remove empty lines
 *  Image - 
 *  Notes - 
 */
export const validateForm = (formData: {
  name: string;
  categories: string[];
  ingredients: string[];
  instructions: string[];
  notes?: string;
}): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};

  // Validate Name
  const namePattern = /^[A-Za-z\s]+$/;
  if (!formData.name.trim()) {
    errors.name = "❗️ Name is required.";
  } else if (!namePattern.test(formData.name)) {
    errors.name = "❗️ Name can only contain letters and spaces.";
  }

  // Validate Categories
  const categoryPattern = /^[a-z]+$/;
  const invalidCategories = formData.categories.filter(
    (category) => !categoryPattern.test(category.toLowerCase())
  );
  if (invalidCategories.length > 0) {
    errors.categories =
      "❗️ Categories must only contain lowercase letters with no spaces or special characters.";
  }

  // Validate Ingredients
  if (formData.ingredients.length === 0) {
    errors.ingredients = "❗️ At least one ingredient is required.";
  }

  // Validate Instructions
  if (formData.instructions.length === 0) {
    errors.instructions = "❗️ At least one instruction is required.";
  }

  // Image (handled by Supabase upload)
  // Notes (optional): No strict validation, leave as is.

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
