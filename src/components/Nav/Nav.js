import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

function Nav() {
  return (
    <nav>
      <h1>
      <Link to="/">
        madisonions
      </Link></h1>
    </nav>
  )
}

export default Nav;