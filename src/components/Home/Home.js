import React from 'react'
import Nav from '../Nav/Nav';
import Recipe from '../Recipe/Recipe';

function Home() {
  return (
    <>
      <Nav />
      <div className="container py-3">
        <Recipe />
      </div>
    </>
  )
}

export default Home;