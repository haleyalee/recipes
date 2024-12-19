"use client";

import React, { useState, useEffect } from "react";
import { FormType, RecipeDetails } from "@/lib/definitions";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useAddRecipe } from "@/hooks/useAddRecipe";
import { useEditRecipe } from "@/hooks/useEditRecipe";
import BackButton from "./BackButton";
import PageHeader from "./PageHeader";
import { useCategories } from "@/hooks/useCategories";

const delimiter = "\n";

interface RecipeFormProps {
  data?: RecipeDetails;
  type: FormType;
};

interface ProcessedRecipeProps {
  name: string,
  categories: string[],
  ingredients: string,
  instructions: string,
  notes?: string
};

interface FormTypeProps {
  formAction: (recipeData: RecipeDetails) => Promise<void>,
  formError: string | null,
  formText: {
    title: string,
    submitBtn: string,
    backBtn: string
  }
}

export default function RecipeForm({
  data = { name: "", categories: [], ingredients: [], instructions: [] },
  type
}: RecipeFormProps) {
  const { categories } = useCategories();
  const [formData, setFormData] = useState<ProcessedRecipeProps>({
    name: "",
    categories: [],
    ingredients: "",
    instructions: "",
  });
  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  let formAction: FormTypeProps["formAction"];
  let formError: FormTypeProps["formError"] = "";
  let formText: FormTypeProps["formText"] = {
    title: "Recipe",
    submitBtn: "Submit Recipe",
    backBtn: "Back"
  };

  useEffect(() => {
    if (type === "edit") {
      setFormData({
        name: data.name,
        categories: data.categories,
        ingredients: data.ingredients.join(delimiter),
        instructions: data.instructions.join(delimiter),
        notes: data.notes ?? ""
      })
    }
  }, [data]);

  if (type === "edit") {
    const { editRecipe, error: editError } = useEditRecipe();
    formAction = editRecipe;
    formError = editError;
    formText = {
      title: "Edit Recipe",
      submitBtn: "Edit Recipe",
      backBtn:"Back to Recipe"
    }
  } else if (type === "add") {
    const { addRecipe, error: addError } = useAddRecipe();
    formAction = addRecipe;
    formError = addError;
    formText = {
      title: "Add a New Recipe",
      submitBtn: "Add Recipe",
      backBtn: "Back to All Recipes"
    }
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
      (c) =>
        c.includes(value.toLowerCase()) && !formData.categories.includes(c)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Form Validation...
    // form name -> no special characters (especially "-" as may mess up slug conversion), force capitalize
    // trim white space (empty /n??)

    const processedData = {
      name: formData.name,
      categories: formData.categories,
      ingredients: formData.ingredients.split(delimiter).map((item) => item.trim()),
      instructions: formData.instructions.split(delimiter).map((item) => item.trim()),
      notes: formData.notes
    };

    // TODO: only submit if form actually changed
    formAction(processedData);
  };
  
  return (
    <div>
      {/* TODO: only ask for confirmation if form changed */}
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

        {/* TODO: ensure don't create new category if already exists; FORCE LOWERCASE! */}
        {/* Categories */}
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
            {formData.categories?.map((category, index) => (
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
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
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
          {formError && <p className="error">{formError}</p>}
        </div>
      </form>
    </div>
  );
}
