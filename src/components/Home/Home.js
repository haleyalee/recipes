import React from 'react';
import Grid from '@material-ui/core/Grid';
import useFetchRecipes from '../../hooks/useFetchRecipes';

import './Home.css';
import Nav from '../Nav/Nav';
import RecipeCard from '../RecipeCard/RecipeCard';
import Searchbar from '../Searchbar/Searchbar';
import Tag from '../Tag/Tag';

// const data = [
//   { id: 0, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
//   { id: 1, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
//   { id: 2, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
//   { id: 3, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
//   { id: 4, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
//   { id: 5, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
//   { id: 6, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
//   { id: 7, img: '', title: "Recipe Title", ingredients: ['ingr1', 'ingr2', 'ingr3'], instructions: ['step1', 'step2', 'step3'], tags: ['tag', 'tag'] },
// ];

function Home() {

  const { data, loaded, error } = useFetchRecipes();

  return (
    <>
      <Nav />
      {!loaded && <div>Loading...</div>}
      {loaded && !error && 
      <div id="home" className="container">

        <Searchbar />

        <div id="tags" className="my-5">
          <Tag tag={"tag1"} />
          <Tag tag={"tag2"} />
          <Tag tag={"tag3"} />
        </div>

        <div id="recipes">
          <Grid container spacing={8}
            justifyContent="center"
            alignItems="center"
          >
            { data.map(recipe => 
              <Grid item key={recipe.id} className="grid-item">
                <RecipeCard img={recipe.img} title={recipe.title} id={recipe.id} />
              </Grid>
            ) }
          </Grid>
        </div>
      </div>
      }
    </>
  )
}

export default Home;