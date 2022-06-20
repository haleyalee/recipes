import React from 'react';

const initialRecipeContext = {
  recipes: [],
  setRecipes: ()=>{return null}
}

const AppContext = React.createContext(initialRecipeContext);
export default AppContext; 