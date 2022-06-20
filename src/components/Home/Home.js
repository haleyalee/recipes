import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import useFetchRecipes from '../../hooks/useFetchRecipes';
import AppContext from '../../contexts';
import axios from 'axios';

import './Home.css';
import Nav from '../Nav/Nav';
import RecipeGrid from '../RecipeGrid/RecipeGrid';
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

  const { recipes, setRecipes } = useContext(AppContext);
  const { data, loaded, error } = useFetchRecipes();

  useEffect(() => {
    axios.get('https://wq439vspnf.execute-api.us-east-2.amazonaws.com/Prod/recipes')
    .then((response) => response.data)
    .then((r) => { console.log(r); setRecipes(r) })
    .catch((err) => console.log(`Error: ${err}`))
  }, []);

  console.log(recipes);

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

        <RecipeGrid data={recipes} />
      </div>
      }
    </>
  )
}

export default Home;