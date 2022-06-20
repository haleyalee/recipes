import React from 'react';

import './Admin.css';
import Nav from '../Nav/Nav';
import RecipeGrid from '../RecipeGrid/RecipeGrid'
import useFetchRecipes from '../../hooks/useFetchRecipes';

function Admin() {

  const { data, loaded, error } = useFetchRecipes();

  return (
    <>
      <Nav />
      <div id="admin-dashboard" className="container">
        {!loaded && <div>Loading...</div>}
        {loaded && !error && 
          <>
            <h1>Admin Dashboard</h1>
            <RecipeGrid data={data} />
          </>
        }
      </div>
    </>
  )
}

export default Admin;