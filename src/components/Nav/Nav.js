import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

function Nav() {

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <div id="navbar" >
      <nav className={(scrollTop > 20) ? 'hide' : ''}>
        <h1>
        <Link to="/">
          madisonions
        </Link></h1>
      </nav>
    </div>
  )
}

export default Nav;