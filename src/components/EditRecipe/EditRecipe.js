import React from 'react'
import { useParams } from 'react-router-dom';
import RecipeForm from '../RecipeForm/RecipeForm';

import './EditRecipe.css';

function EditRecipe() {

  const { id } = useParams();

  return (
    <div>EditRecipe</div>
  )
}

export default EditRecipe