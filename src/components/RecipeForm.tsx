"use client";

import React, { useState, useEffect } from "react";
import { FormType, RecipeDetails } from "@/lib/definitions";
import { capitalizeFirstLetterOfEachWord } from "@/utils/helper";
import { useAddRecipe } from "@/hooks/useAddRecipe";
import { useEditRecipe } from "@/hooks/useEditRecipe";
import BackButton from "./buttons/BackButton";
import PageHeader from "./PageHeader";
import { useCategories } from "@/hooks/useCategories";
import { validateForm, ValidationErrors } from "@/utils/formHelper";
import FormSubheader from "./FormSubheader";
import { uploadImage } from "@/utils/uploadImage";

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
  notes?: string,
  image?: string
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
  const [hasChanged, setHasChanged] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [categoryInput, setCategoryInput] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  let formAction: FormTypeProps["formAction"];
  let formError: FormTypeProps["formError"] = "";
  let formText: FormTypeProps["formText"] = {
    title: "Recipe",
    submitBtn: "Submit Recipe",
    backBtn: "Back"
  };

  // Populate already existing data
  useEffect(() => {
    if (type === "edit") {
      setFormData({
        name: data.name,
        categories: data.categories,
        ingredients: data.ingredients.join(delimiter),
        instructions: data.instructions.join(delimiter),
        notes: data.notes ?? undefined
      })
    }
  }, [data]);

  // Determine if data has changed
  useEffect(() => {
    const originalData = JSON.stringify(data);
    const newData = JSON.stringify({
      id: data.id,
      ...formData, 
      ingredients: formData.ingredients ? formData.ingredients.split(delimiter) : [], 
      instructions: formData.instructions ? formData.instructions.split(delimiter) : []
    });
    if (originalData !== newData) {
      setHasChanged(true);
    }
  }, [formData]);

  // Set form text depending on action
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
      [name]: value
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const { publicURL, error } = await uploadImage(file);

      if (error) {
        setValidationErrors((prevErr) => ({
          ...prevErr,
          image: `❗️ ${error}`,
        }));
        console.error("Image upload failed:", error);
        return;
      }

      if (publicURL) {
        console.log("Image uploaded successfully:", publicURL);
        setFormData((prevData) => ({
          ...prevData,
          image: publicURL,
        }));
      }
    }
  }
  
  // TODO: refactor category form input
  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setCategoryInput(value);

    // Filter existing categories and include the "Add new category" option
    const filtered = categories.filter(
      (c) =>
        c.includes(value) && !formData.categories.includes(c)
    );
    setFilteredCategories(value.trim() ? [...filtered, `Add new category: ${value}`] : filtered);
  };

  const handleCategoryAdd = (category: string) => {
    if (!formData.categories.includes(category)) {
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

  // TODO: Hitting enter should not auto submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up and reformat
    const name = capitalizeFirstLetterOfEachWord(formData.name);
    const categories = formData.categories;
    const ingredients = formData.ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    const instructions = formData.instructions
      .split("\n")
      .map((item) => item.trim()) 
      .filter((item) => item !== "");
    const image = formData.image;
    const notes = formData.notes;

    const processedData = {
      name: name,
      categories: categories,
      ingredients: ingredients,
      instructions: instructions,
      image: image,
      notes: notes
    };

    const { isValid, errors } = validateForm(processedData);

    if (isValid) formAction(processedData);
    else setValidationErrors(errors);
  };
  
  return (
    <div className="p-8">
      {/* Need to redirect to specific recipe for  */}
      <BackButton confirm={hasChanged}>{ formText.backBtn }</BackButton>
      <div className="w-8/12 mx-auto pb-8 mt-8">
        <PageHeader>{formText.title}</PageHeader>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* Recipe name */}
          <div className="mb-4">
            <FormSubheader htmlFor="name">Recipe Name</FormSubheader>
            <input 
              id="name"
              name="name"
              type="text"
              placeholder="Recipe Name"
              value={formData.name}
              onChange={handleChange}
              className="mt-4 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            <div className="mt-1 text-sm text-red-500">{validationErrors.name}</div>
          </div>

          {/* Categories */}
          <div className="mb-4">
            <FormSubheader htmlFor={"categories"}>Categories</FormSubheader>
            <div className="relative">
              <input
                id="categories"
                type="text"
                placeholder="Add categories"
                value={categoryInput}
                onChange={handleCategoryInputChange}
                className="mt-4 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
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
                  {capitalizeFirstLetterOfEachWord(category)}
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
            <div className="mt-1 text-sm text-red-500">{validationErrors.categories}</div>
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <FormSubheader htmlFor="ingredients">Ingredients</FormSubheader>
            <textarea 
              id="ingredients"
              name="ingredients"
              placeholder="Ingredients (separated by a new line)"
              rows={6}
              value={formData.ingredients}
              onChange={handleChange}
              className="mt-4 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            <div className="mt-1 text-sm text-red-500">{validationErrors.ingredients}</div>
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <FormSubheader htmlFor="instructions">Instructions</FormSubheader>
            <textarea
              id="instructions"
              name="instructions"
              placeholder="Instructions (separated by a new line)"
              rows={8}
              value={formData.instructions}
              onChange={handleChange}
              className="mt-4 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            <div className="mt-1 text-sm text-red-500">{validationErrors.instructions}</div>
          </div>

          {/* Image */}
          {/* TODO: remove image */}
          <div className="mb-4">
            <FormSubheader htmlFor="image-file">Image</FormSubheader>
            <input
              type="file"
              id="image-file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4 block rounded-md border-none shadow-sm sm:text-sm"
            />
            <div className="mt-1 text-sm text-red-500">{validationErrors.image}</div>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <FormSubheader htmlFor="notes">Notes</FormSubheader>
            <textarea
              id="notes"
              name="notes"
              placeholder="Any additional comments"
              value={formData.notes}
              onChange={handleChange}
              className="mt-4 p-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
          </div>

          {/* Submit button */}
          {/* TODO: submit should be disabled until image stops loading */}
          <div>
            <button
              type="submit"
              className="mt-4 px-3 py-1 bg-linkGreen text-white font-medium rounded-full shadow-sm hover:bg-hoverGreen"
            >
              { formText.submitBtn }
            </button>
            {formError && <p className="error">{formError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
