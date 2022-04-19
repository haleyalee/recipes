import React from 'react'

import './Tag.css';

function Tag(props) {
  const { tag } = props;
  return (
    <span className="tag">{tag}</span>
  )
}

export default Tag