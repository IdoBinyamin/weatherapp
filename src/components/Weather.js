import React, { useRef } from 'react';
import { useCityWeatherProvider } from '../City.Provider';
import './Weather.css';
import WeekShow from './WeekShow';

export default function Weather(props) {
  const {updateFavoritesCities, favoritesCities, isExsist, searchedCity, searchedCityWeather } =
    useCityWeatherProvider();
  const cityToSearch = useRef(null);
  function handleSearch() {
    props.city(cityToSearch.current.value);
  }

  function handleAddFavoriteBtn() {
    props.addToFavorite();
  }

  function handleRemoveFavoriteBtn() {
    console.log('work');
    const index = favoritesCities.findIndex((fav) => fav.name === searchedCity);
    console.log(index);
    updateFavoritesCities(favoritesCities.splice(index, 1)) ;
  }

  return (
    <div className="main-page">
      <div id="search-panel">
        <input
          id="search-line"
          ref={cityToSearch}
          type={'search'}
          placeholder="Enter city name"
        />

        <button id="search-btn" onClick={handleSearch}>
          Search
        </button>
        <br />
      </div>
      <div className="favorite-btn">
        <button
          onClick={isExsist ? handleRemoveFavoriteBtn : handleAddFavoriteBtn}
        >
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
