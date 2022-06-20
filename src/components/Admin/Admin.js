import React, { useContext, useEffect } from 'react';

import AppContext from '../../contexts';
import './Admin.css';
import Nav from '../Nav/Nav';
import RecipeGrid from '../RecipeGrid/RecipeGrid'
import useFetchRecipes from '../../hooks/useFetchRecipes';

function Admin() {

  const { data, loaded, error } = useFetchRecipes();
  const { recipes, setRecipes } = useContext(AppContext);

  useEffect(() => {
    setRecipes(data);
  }, [data] )

  return (
    <>
      <Nav />
      <div id="admin-dashboard" className="container">
        <h1>Admin Dashboard</h1>
        {recipes && <RecipeGrid data={recipes} /> }
      </div>
    </>
  )
}

export default Admin;