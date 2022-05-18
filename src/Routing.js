import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Recipe from './components/Recipe/Recipe';
import RecipeForm from './components/RecipeForm/RecipeForm';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/recipe/:id" element={<Recipe />}></Route>
      <Route path="/admin" element={<RecipeForm />}></Route>
    </Routes> 
  )
}

export default Routing;