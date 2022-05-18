import React, { useState, useEffect } from 'react'
import './List.css';

function List(props) {
  const {type, list, setList} = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(list);
  }, [list])

  const addToList = () => {
    const newList = [...list];
    newList.push(value);
    setList(newList);
  }

  return (
    <>
      <div className="input-group mb-3">
        <input 
          id={type}
          type="text" 
          className="form-control" 
          placeholder={`Add new ${type}`}
          value={value} 
          onChange={(e)=>setValue(e.target.value)} 
          required
        />
        <button 
          className="btn btn-outline-secondary px-4"
          type="button"
          onClick={addToList}
        >
          Add
        </button>
      </div>
      <select className="list" name={`${type}-list`} multiple>
        {list.map((val, idx) =>
          <option key={idx}>{val}</option>
        )}
      </select>
    </>
  )
}

export default List