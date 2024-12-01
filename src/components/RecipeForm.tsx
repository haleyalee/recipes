"use client";

import { useState } from "react";
import { FormType, RecipeDetails } from "../lib/definitions";
import { useRouter } from 'next/navigation';
import BackButton from "./BackButton";
import PageHeader from "./PageHeader";
import { categories } from "../lib/placeholder-data";
import { capitalizeFirstLetter, getCategoryForRecipe, getPathFromName } from "../utils/helper";

const delimiter = "\n";

interface RecipeFormProps {
  data?: RecipeDetails;
  type: FormType;
}

export default function RecipeForm({
  data = { name: "", ingredients: [""], instructions: [""], notes: "" },
  type
}: RecipeFormProps) {

  const router = useRouter();
  const path = getPathFromName(data.name);

  const [formData, setFormData] = useState({
    name: data.name,
    categories: getCategoryForRecipe(path),
    // If editing an existing recipe, convert string[] to string separated by commas
    ingredients: data.ingredients.join(delimiter),
    instructions: data.instructions.join(delimiter),
    notes: data.notes
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const formText = {
    title: type === "edit" ? "Edit Recipe" : "Add a New Recipe",
    submitBtn: type === "edit" ? "Edit Recipe" : "Add Recipe",
    backBtn: type === "edit" ? "Back to Recipe" : "Back to All Recipes"
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Store the raw input value as a string
    }));
  };

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryInput(value);

    // Filter existing categories and include the "Add new category" option
    const filtered = categories.filter(
      (category) =>
        category.includes(value.toLowerCase()) && !formData.categories.includes(category)
    );

    setFilteredCategories(value.trim() ? [...filtered, `Add new category: ${value}`] : filtered);
  };

  const handleCategoryAdd = (category: string) => {
    if (!formData.categories.includes(category)) {
      // Process category
      const processedCat = category.toLowerCase();
      setFormData((prevData) => ({
        ...prevData,
        categories: [...prevData.categories, processedCat],
      }));
      setCategoryInput("");
      setFilteredCategories(categories);
    }
  };

  const handleDropdownClick = (option: string) => {
    if (option.startsWith("Add new category: ")) {
      const newCategory = option.replace("Add new category: ", "").trim();
      handleCategoryAdd(newCategory);
    } else {
      handleCategoryAdd(option);
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter((cat) => cat !== category),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Process data
    const processedData = {
      name: formData.name,
      ingredients: formData.ingredients.split(delimiter).map((item) => item.trim()),
      instructions: formData.instructions.split(delimiter).map((item) => item.trim()),
      notes: formData.notes
    };

    // Process new categories
    // Update running list of all categories

    console.log("Categories Updated", formData.categories);
    console.log("Recipe Submitted:", processedData);

    // TODO: Add logic to save the recipe

    // Redirect
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/recipes');
    }
  };

  
  return (
    <div>
      <BackButton confirm={type === "edit"}>{ formText.backBtn }</BackButton>
      <PageHeader>{formText.title}</PageHeader>
      <form className="mt-4" onSubmit={handleSubmit}>
        {/* Recipe name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Name
          </label>
          <input 
            id="name"
            name="name"
            type="text"
            placeholder="Recipe Name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            required
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <div className="relative">
            <input
              id="categories"
              type="text"
              placeholder="Add categories"
              value={categoryInput}
              onChange={handleCategoryInputChange}
              className="p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            {categoryInput && filteredCategories.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md shadow-md w-full max-h-40 overflow-y-auto">
                {filteredCategories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => handleDropdownClick(category)}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-2">
            {formData.categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 text-sm font-medium bg-gray-200 rounded-full mr-2"
              >
                {capitalizeFirstLetter(category)}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            Ingredients
          </label>
          <textarea 
            id="ingredients"
            name="ingredients"
            placeholder="Ingredients (separated by a new line)"
            rows={4}
            value={formData.ingredients}
            onChange={handleChange}
            className="mt-1 p-2 block w-full whitespace-pre rounded-md border-gray-300 shadow-sm sm:text-sm"
            required
          />
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-700"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            placeholder="Instructions (separated by a new line)"
            rows={6}
            value={formData.instructions}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            required
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Any additional comments"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="px-3 py-1 bg-linkGreen text-white font-medium rounded-full shadow-sm hover:bg-hoverGreen"
          >
            { formText.submitBtn }
          </button>
        </div>
      </form>
    </div>
  );
}
