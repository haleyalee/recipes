"use client";

import React, { useState } from "react";
import { useDeleteRecipe } from "@/hooks/useDeleteRecipe";
import { useRouter } from "next/navigation";
import DeleteIcon from "@/components/icons/DeleteIcon";
import ConfirmationModal from "../ConfirmationModal";

interface DeleteRecipeButtonProps {
  slug: string,
  buttonTxt?: string
}

export default function DeleteRecipeButton({ slug, buttonTxt }: DeleteRecipeButtonProps) {
  const router = useRouter();
  const { deleteRecipe, error } = useDeleteRecipe();
  const [showModal, setShowModal] = useState(false);


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteRecipe(slug);
      router.push("/recipes");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    } finally {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <button 
        className="flex rounded-full px-3 py-1 text-white items-center bg-linkGreen hover:bg-hoverGreen shadow-sm"
        onClick={handleClick}
      >
        <DeleteIcon />
        {buttonTxt && <span className="ml-1">{buttonTxt}</span>}
      </button>
      { error && <div>${error}</div> }
      <ConfirmationModal 
        isOpen={showModal} 
        onClose={closeModal} 
        onConfirm={handleDelete} 
        description="Are you sure you want to delete this recipe? This action cannot be undone."
        confirmBtn="Yes, delete recipe"
      />
    </>
  );
}
