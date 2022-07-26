import React from 'react';
import './Weather.css';

export default function Weather(props) {
  return (
    <div className="main-page">
      <div id="search-panel">
        <input
          id="search-line"
          ref={props.cityToSearch}
          type={'search'}
          placeholder="Enter city name"
        />

        <button id="search-btn" onClick={props.city}>
          Search
        </button>
        <br />
      </div>
      {/* <button onClick={props.getWeatherForWeek}>test</button> */}
      <div className="favorite-btn">
        <button onClick={props.addToFavorite}>Add to Favorite</button>
      </div>
      <h2>{props.theCity}</h2>
      <h3>{props.searchedCityWeather}</h3>
      <p>{props.error}</p>
      <div className="5-Days"></div>
    </div>
  );
}
