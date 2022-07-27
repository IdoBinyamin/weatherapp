import React, { useRef } from 'react';
import { useCityWeatherProvider } from '../City.Provider';
import './Weather.css';
import WeekShow from './WeekShow';

export default function Weather(props) {
  const { favoritesCities, isExsist, searchedCity, searchedCityWeather } =
    useCityWeatherProvider();
  const cityToSearch = useRef(null);
  function handleSearch() {
    props.city(cityToSearch.current.value);
  }

  function handleFavoriteBtn() {
    if (isExsist) {
      for (let i = 0; i < favoritesCities.length; i++) {
        if (favoritesCities[i].name === searchedCity) {
          favoritesCities.slice(favoritesCities[i], 1);
        }
      }
    }
    props.addToFavorite();
    console.log(isExsist);
    // console.log(allWeekDays);
  }

  return (
    <div className="main-page">
      <div id="search-panel">
        <input
          id="search-line"
          ref={cityToSearch}
          type={'search'}
          defaultValue="Tel Aviv"
          placeholder="Enter city name"
        />

        <button id="search-btn" onClick={handleSearch}>
          Search
        </button>
        <br />
      </div>
      <div className="favorite-btn">
        <button onClick={handleFavoriteBtn}>
          {isExsist ? 'Remove from' : 'Add to'} Favorite
        </button>
      </div>
      <h2>{searchedCity}</h2>
      <h3>{searchedCityWeather}</h3>
      <p>{props.error}</p>
      <div className="five-Days">{<WeekShow />}</div>
    </div>
  );
}
