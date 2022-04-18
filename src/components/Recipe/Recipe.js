import React from 'react';
import './Recipe.css';

function Recipe() {
  return (
    <div className="recipe">
      <div className="meta">
        <h2>Recipe Title</h2>
        <p>Date</p>
        <div className="tags">
          <span className="tag">tag</span>
          <span className="tag">tag</span>
        </div>
      </div>

      <div className="ingredients">
        <h3>Ingredients</h3>
        <ul>
          <li>ingredient</li>
          <li>ingredient</li>
          <li>ingredient</li>
        </ul>
      </div>

      <div className="instructions">
        <h3>Instructions</h3>
        <ol>
          <li>instruction</li>
          <li>instruction</li>
          <li>instruction</li>
        </ol>
      </div> 
    </div>
  )
}

export default Recipe