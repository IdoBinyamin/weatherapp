import React from 'react';
import './Search.css';

export default function SearchCity(props) {
  return (
    <div id="search-panel">
      <form onSubmit={props.searchCity}>
        <input
          id="search-line"
          type={'text'}
          placeholder={"Name of the city you'r looking"}
        />
        <button
          onClick={() => {
            props.setIsExsist(false);
          }}
          id="search-btn"
        >
          Search
        </button>
      </form>
    </div>
  );
}
