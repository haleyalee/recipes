import React, { useState, useEffect } from 'react'
import './List.css';

function List(props) {
  const {type, list, setList} = props;
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log(list)
  }, [list])

  const addToList = () => {
    const newList = [...list];
    if (newList.includes(value)) {
      alert(`Duplicate entry, please enter a new ${type}`);
    } else if (value) {
      newList.push(value);
      setList(newList);
      setValue('');
      setSelected([]);
    } else {
      alert(`Please enter a valid ${type}`)
    }
  }

  const removeFromList = () => {
    const newList = [...list];
    const idx = newList.indexOf(value);
    if (idx === 0) {
      newList.shift();
    } else if (idx === newList.length-1) {
      newList.pop();
    } else {
      newList.splice(idx, 1);
    }
    setList(newList);
    setValue('');
    setSelected([]);
  }

  const shift = (dir) => {
    const newList = [...list];
    const idx = list.indexOf(selected[0]);
    if (dir === "up" && idx > 0) {
      const temp = newList[idx-1];
      newList[idx-1] = newList[idx];
      newList[idx] = temp; 
    } else if (dir === "down" && idx < newList.length-1) {
      const temp = newList[idx+1];
      newList[idx+1] = newList[idx];
      newList[idx] = temp;
    }
    setList(newList);
    setValue('');
    setSelected([]);
  }

  const handleChange = (e) => {
    setSelected([e.target.value]);
    setValue(e.target.value);
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
          type="button"
          className="btn btn-outline-secondary px-4"
          onClick={addToList}
        >
          Add
        </button>
        <button 
          type="button" 
          className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" 
          data-toggle="dropdown" 
          aria-expanded="false"
        >
          <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li><a className="dropdown-item" onClick={addToList}>Add</a></li>
          <li><a className="dropdown-item" onClick={removeFromList}>Remove</a></li>
          <li><a className="dropdown-item" onClick={()=>shift("up")}>Move Up</a></li>
          <li><a className="dropdown-item" onClick={()=>shift("down")}>Move Down</a></li>
        </ul>
      </div>
      <select 
        className="form-select list" 
        name={`${type}-list`} 
        size="5"
        value={selected}
        onChange={handleChange}
        multiple
      >
        {list.map((val, idx) =>
          <option key={idx} value={val}>{val}</option>
        )}
      </select>
    </>
  )
}

export default List