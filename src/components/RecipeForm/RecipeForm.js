import React, { useState } from 'react';

import './RecipeForm.css';

import Nav from '../Nav/Nav';
import List from '../List/List';

function RecipeForm() {

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState('');


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
            <label htmlFor="tags" className="form-label">Tags</label>
            <input 
              id="tags" 
              type="text" 
              className="form-control" 
              placeholder="Tags" 
              value={tags} 
              onChange={(e)=>setTags(e.target.value)} 
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
        </form>
      </div>
    </>
  )
}

export default RecipeForm;