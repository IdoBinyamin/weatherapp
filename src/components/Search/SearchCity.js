import React from 'react';
import './Search.css';

export default function SearchCity(props) {
  const handleSearch = (e) => {
    props.searchCity(e);
  };
  return (
    <div id="search-panel">
      <form onSubmit={handleSearch}>
        <input id="search-line" type={'text'} placeholder={'Name of a city '} />
        <button id="search-btn">Search</button>
      </form>
    </div>
  );
}
