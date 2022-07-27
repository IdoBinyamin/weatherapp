import React, { useRef } from 'react';
import { useCityWeatherProvider } from '../City.Provider';
import './Weather.css';

export default function Weather(props) {
  const { allWeekDays, searchedCity, searchedCityWeather } =
    useCityWeatherProvider();
  const cityToSearch = useRef(null);
  function handleSearch() {
    props.city(cityToSearch.current.value);
  }

  function handleFavoriteBtn() {
    props.addToFavorite();

    console.log(cityToSearch.current.value, allWeekDays);
  }

  return (
    <div className="main-page">
      <div id="search-panel">
        <input
          id="search-line"
          ref={cityToSearch}
          type={'search'}
          // defaultValue="Tel Aviv"
          placeholder="Enter city name"
        />

        <button id="search-btn" onClick={handleSearch}>
          Search
        </button>
        <br />
      </div>
      <div className="favorite-btn">
        <button onClick={handleFavoriteBtn}>
          {props.isExist ? 'Remove from' : 'Add to'} Favorite
        </button>
      </div>
      <h2>{searchedCity}</h2>
      <h3>{searchedCityWeather}</h3>
      <p>{props.error}</p>
      <div className="5-Days">{/* <p>{AllWeekDays[0].Date}</p> */}</div>
    </div>
  );
}
