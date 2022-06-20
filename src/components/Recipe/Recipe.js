import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// import useFetchRecipeById from '../../hooks/useFetchRecipeById';
import AppContext from '../../contexts';
import Nav from '../Nav/Nav';
import Tag from '../Tag/Tag';
import './Recipe.css';

function Recipe() {
  const { id } = useParams();
  // const { data, loaded, error } = useFetchRecipeById(id);
  const { recipes } = useContext(AppContext);
  const [recipe, setRecipe] = useState({});

  const [img, setImg] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setRecipe(recipes.find(r=>r.id==id))
  }, [id, recipes, setRecipe])

  useEffect(() => {
    setImg(recipe.img);
    setDate(recipe.date);
    setTitle(recipe.title);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setTags(recipe.tags);
  }, [recipe])
  
  return (
    <>
      <Nav />
      <div className="recipe container">
        <div className="meta">
          <h2>{title}</h2>
          <p>Published: {date}</p>
          <div className="tags">
            {tags && tags.map((t, idx) => <Tag key={idx} tag={t} />)}
          </div>
        </div>

        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {ingredients && ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
        </div>

        <div className="instructions">
          <h3>Instructions</h3>
          <ol>
            {instructions && instructions.map((i, idx) => <li key={idx}>{i}</li>)}
          </ol>
        </div> 
      </div>
    </>
  )
}

export default Recipe