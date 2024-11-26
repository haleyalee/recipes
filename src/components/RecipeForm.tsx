"use client";

import { useState } from "react";
import { RecipeForm as RecipeFormProps } from "../lib/definitions";
import { redirect } from "next/navigation";

const delimiter = "\n";

export default function RecipeForm({
  data = { name: "", ingredients: [""], instructions: [""] },
  type
}: RecipeFormProps) {

  const [formData, setFormData] = useState({
    name: data.name,
    // If editing an existing recipe, convert string[] to string separated by commas
    ingredients: data.ingredients.join(delimiter),
    instructions: data.instructions.join(delimiter)
  });

  const formText = {
    title: type === "edit" ? "Edit Recipe" : "Add a New Recipe",
    submitBtn: type === "edit" ? "Edit Recipe" : "Add Recipe"
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Store the raw input value as a string
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Process data
    const processedData = {
      name: formData.name,
      ingredients: formData.ingredients.split(delimiter).map((item) => item.trim()),
      instructions: formData.instructions.split(delimiter).map((item) => item.trim()),
    };

    console.log("Recipe Submitted:", processedData);

    // TODO: Add logic to save the recipe

    // Redirect
    redirect("/recipes");
  };

  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{ formText.title }</h1>
      <form onSubmit={handleSubmit}>
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
        {/* <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Category Tags
          </label>
          <textarea 
            id="tags"
            name="tags"
            placeholder="category tags, separated by a comma"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            required
          />
        </div> */}

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
            placeholder="Ingredients, separated by a new line"
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
            placeholder="Instructions, separated by a new line"
            rows={6}
            value={formData.instructions}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            required
          />
        </div>

        {/* Notes */}
        {/* <div className="mb-4">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="any additional comments"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div> */}

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600"
          >
            { formText.submitBtn }
          </button>
        </div>
      </form>
    </div>
  );
}
