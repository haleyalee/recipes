import React from 'react';
import { Link } from 'react-router-dom';

import edit from '../../assets/images/icons/edit.svg';
import './RecipeCard.css';

function RecipeCard(props) {

  const { img, title, id, admin } = props;

  return (
    <>
      { admin && 
        <Link to={`/recipe/${id}`} className="recipe-card">
          <a href="" className="edit-btn"><img src={edit} /></a>
          <img className="recipe-img" src={img} alt={title} width={220} height={275} />
          <h2>{title}</h2>
        </Link>
      }
      { !admin && 
        <Link to={`/recipe/${id}`} className="recipe-card">
          <a href="" className="edit-btn"><img src={edit} /></a>
          <img className="recipe-img" src={img} alt={title} width={220} height={275} />
          <h2>{title}</h2>
        </Link>
      }
    </>
  )
}

export default RecipeCard