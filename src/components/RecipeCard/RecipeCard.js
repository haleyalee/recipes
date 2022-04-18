import React from 'react';
import { Link } from 'react-router-dom';

import './RecipeCard.css';

function RecipeCard(props) {

  const { img, title } = props;
  return (
    <Link to="/recipe" className="recipe-card">
      <img src={img} alt={title} width={220} height={275} />
      <h2>{title}</h2>
    </Link>
  )
}

export default RecipeCard