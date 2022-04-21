import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchRecipeById from '../../hooks/useFetchRecipeById';
import Nav from '../Nav/Nav';
import Tag from '../Tag/Tag';
import './Recipe.css';

function Recipe() {
  const { id } = useParams();
  const { data, loaded, error } = useFetchRecipeById(id);

  const [img, setImg] = useState('');
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setImg(data.img);
    setTitle(data.title);
    setIngredients(data.ingredients);
    setInstructions(data.instructions);
    setTags(data.tags);
  }, [data])
  
  return (
    <>
      <Nav />
      {(!loaded || error !== '') && <div>Loading...</div>}
      {loaded && <div className="recipe container">
        <div className="meta">
          <h2>{title}</h2>
          <p>Date</p>
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
      }
    </>
  )
}

export default Recipe