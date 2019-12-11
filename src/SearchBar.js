import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
     
<label>
        <strong>Filter:</strong>
        <select onChange={(event) => props.sortByFilter(event.target.value)}>
          <option value="Shoes">Shoes</option>
          <option value="Electronics">Electronics</option>
          
        </select>
      </label>
    </div>
  );
}
export default SearchBar;
