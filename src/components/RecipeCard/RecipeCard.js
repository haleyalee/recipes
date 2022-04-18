import React from 'react';

import './RecipeCard.css';

function RecipeCard(props) {

  const { img, title } = props;
  return (
    <div className="recipe-card">
      <img src={img} alt={title} width={220} height={275} />
      <h2>{title}</h2>
    </div>
  )
}

export default RecipeCard