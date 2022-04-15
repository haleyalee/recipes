import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes> 
  )
}

export default Routing;