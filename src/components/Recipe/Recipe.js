import React from 'react';
import Nav from '../Nav/Nav';
import Tag from '../Tag/Tag';
import './Recipe.css';

function Recipe() {
  return (
    <>
      <Nav />
      <div className="recipe container">
        <div className="meta">
          <h2>Recipe Title</h2>
          <p>Date</p>
          <div className="tags">
            <Tag tag={"tag1"} />
            <Tag tag={"tag2"} />
            <Tag tag={"tag3"} />
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
    </>
  )
}

export default Recipe