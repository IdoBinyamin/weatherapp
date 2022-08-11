import React, { useRef } from 'react';
import { useCityWeatherProvider } from '../../City.Provider';
import './Weather.css';
import WeekShow from '../weekShoow/WeekShow';

export default function Weather(props) {
  const {
    updateRemoveFavoritesCities,
    favoritesCities,
    isExsist,
    searchedCity,
    searchedCityWeather,
    updateIsExsist,
    currCondition,
  } = useCityWeatherProvider();
  const cityToSearch = useRef(null);

  let errorMsg = '';
  if (
    props.error ===
    "Cannot read properties of undefined (reading 'LocalizedName')"
  ) {
    errorMsg = 'Cant find this city';
  }

  function handleSearch() {
    if (
      cityToSearch.current.value.toLowerCase() < 'a' ||
      cityToSearch.current.value.toLowerCase() > 'z'
    ) {
      alert('Search only in English!');
      return;
    } else {
      return props.cityInfo(cityToSearch.current.value);
    }
  }

  function handleAddFavoriteBtn() {
    if (isExsist) {
      handleRemoveFavoriteBtn();
    } else {
      searchedCity !== '' ? props.addToFavorite() : alert('Search city name!');
    }
  }

  function handleRemoveFavoriteBtn() {
    const index = favoritesCities.findIndex((fav) => fav.name === searchedCity);
    favoritesCities.splice(index, 1);
    updateRemoveFavoritesCities(favoritesCities);
    alert(`${searchedCity} removed!`);
    updateIsExsist(false);
  }

  return (
    <div className="main-page">
      <div id="search-panel">
        <input
          id="search-line"
          ref={cityToSearch}
          type={'search'}
          placeholder="Enter city name in English"
        />

        <button id="search-btn" onClick={handleSearch}>
          Search
        </button>
        <br />
      </div>
      <p id="error">{errorMsg}</p>

      <div className="details">
        <h2 className="write-to-center">
          {searchedCity}{' '}
          <p className="favorite-btn" onClick={handleAddFavoriteBtn} style={{color:`${isExsist ?  'yellow' : ''}`}}>
            &#9734;
          </p>
        </h2>
        <h3 className="write-to-center">{searchedCityWeather} &#8451;</h3>
      </div>
      <div className="icon">
        <div
          id={'icon'}
          style={{
            display: 'flex',
            backgroundImage: `url("https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${
              currCondition < 10 ? '0' + currCondition : currCondition
            }-s.png")`,
          }}
        ></div>
      </div>

      <div className="five-Days">{<WeekShow />}</div>
    </div>
  );
}
