import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Recipe from './components/Recipe/Recipe';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/recipe" element={<Recipe />}></Route>
    </Routes> 
  )
}

export default Routing;