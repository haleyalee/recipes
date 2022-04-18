import React from 'react';
import Grid from '@material-ui/core/Grid';

import './Home.css';

import Nav from '../Nav/Nav';
import Recipe from '../Recipe/Recipe';
import RecipeCard from '../RecipeCard/RecipeCard';

const data = [
  { id: 0, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
  { id: 1, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
  { id: 2, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
  { id: 3, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
  { id: 4, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
  { id: 5, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
  { id: 6, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
  { id: 7, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
];

function Home() {
  return (
    <>
      <Nav />
      <div className="container py-3">
        <Grid container spacing={8}
          id="recipes"
          display="flex"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          { data.map(recipe => 
            <Grid item 
              key={recipe.id} 
              className="grid-item"
            >
              <RecipeCard img={recipe.img} title={recipe.title} />
            </Grid>
          ) }
        </Grid>
      </div>
    </>
  )
}

export default Home;