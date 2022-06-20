import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './RecipeForm.css';

import Nav from '../Nav/Nav';
import List from '../List/List';
import axios from 'axios';

function RecipeForm(props) {

  const [title, setTitle] = useState(props.title ? props.title : '');
  const [tags, setTags] = useState(props.tags ? props.tags : []);
  const [ingredients, setIngredients] = useState(props.ingredients ? props.ingredients : []);
  const [instructions, setInstructions] = useState(props.instructions ? props.instructions : []);
  const [image, setImage] = useState(props.image ? props.image : '');

  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (shouldRedirect) navigate('/')
  }, [shouldRedirect]);

  const postRecipe = (recipe) => {
    axios.post('https://wq439vspnf.execute-api.us-east-2.amazonaws.com/Prod/recipe', recipe)
    .then(() => console.log("Successfully posted recipe"))
    .catch(error => console.log(`Failed to post recipe: ${error}`))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      title: title,
      img: image,
      ingredients: ingredients,
      instructions: instructions,
      tags: tags
    }
    postRecipe(recipe);
    setShouldRedirect(true);
  }

  return (
    <>
      <Nav />
      <div className="recipe-form container">
        <h1>Add Recipe</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Recipe Title</label>
            <input 
              id="title" 
              type="text" 
              className="form-control" 
              placeholder="Title" 
              value={title} 
              onChange={(e)=>setTitle(e.target.value)} 
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags </label>
            <small className="ml-3">: please separate tags with commas</small>
            <input 
              id="tags" 
              type="text" 
              className="form-control" 
              placeholder="Tags" 
              value={tags} 
              onChange={(e)=>setTags(e.target.value.split(','))} 
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">Ingredients</label>
            <List type={"ingredient"} list={ingredients} setList={setIngredients}/>
          </div>
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">Instructions</label>
            <List type={"instruction"} list={instructions} setList={setInstructions} />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input 
              id="image" 
              type="text" 
              className="form-control" 
              placeholder="image" 
              value={image} 
              onChange={(e)=>setImage(e.target.value)} 
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSubmit}
          >
            Add Recipe
          </button>
        </form>
      </div>
    </>
  )
}

export default RecipeForm;