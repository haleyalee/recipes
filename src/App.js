import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routing';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
