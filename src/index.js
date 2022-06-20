import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'typeface-roboto';
import RecipeContextProvider from './contexts/RecipeContextProvider';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecipeContextProvider>
      <App />
    </RecipeContextProvider>
  </React.StrictMode>
);
