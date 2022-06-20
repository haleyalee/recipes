import React, { useState } from 'react';
import AppContext from '.';

const RecipeContextProvider = ({children}) => {
  const initialData = [];
  const [recipes, setRecipes] = useState(initialData);

	const context = {
		recipes,
		setRecipes,
	};

	return (
		<AppContext.Provider value={ context }>
			{children}
		</AppContext.Provider>
	);
}

export default RecipeContextProvider;