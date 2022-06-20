import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import RecipeForm from '../RecipeForm/RecipeForm';
import AppContext from '../../contexts';

import './EditRecipe.css';

function EditRecipe() {

  const { id } = useParams();
  const { recipes, setRecipes } = useContext(AppContext);

  return (
    <div>EditRecipe</div>
  )
}

export default EditRecipe