import React from 'react'
import Grid from '@material-ui/core/Grid';
import RecipeCard from '../RecipeCard/RecipeCard';

import './RecipeGrid.css'

function RecipeGrid(props) {

  const {data} = props;

  return (
    <div id="recipes">
      <Grid container spacing={8}
        justifyContent="center"
        alignItems="center"
      >
        { data.map(recipe => 
          <Grid item key={recipe.id} className="grid-item">
            <RecipeCard img={recipe.img} title={recipe.title} id={recipe.id} admin={true} />
          </Grid>
        ) }
      </Grid>
    </div>
  )
}

export default RecipeGrid