import React, { useRef } from 'react';
import { useCityWeatherProvider } from '../City.Provider';
import './Weather.css';
import WeekShow from './WeekShow';

export default function Weather(props) {
  const {
    updateRemoveFavoritesCities,
    favoritesCities,
    isExsist,
    searchedCity,
    searchedCityWeather,
    updateIsExsist,
    // currCondition,
  } = useCityWeatherProvider();
  const cityToSearch = useRef(null);
let bgPhoto = `url(${'../img/icons/' + '01' + '-s.png'})`;
  let errorMsg = '';
  if (
    props.error ===
    "Cannot read properties of undefined (reading 'LocalizedName')"
  ) {
    errorMsg = 'Cant find this city';
  }

  function handleSearch() {
    if (cityToSearch.current.value < 'a' || cityToSearch.current.value > 'z') {
      alert('Search only in English!');
      return;
    } else {
      props.city(cityToSearch.current.value);
    }
  }

  function handleAddFavoriteBtn() {
    searchedCity !== '' ? props.addToFavorite() : alert('Search city name!');
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
      <p>{errorMsg}</p>

      <div className="favorite-btn">
        <button
          onClick={isExsist ? handleRemoveFavoriteBtn : handleAddFavoriteBtn}
        >
          {isExsist ? 'Remove from' : 'Add to'} Favorite
        </button>
      </div>
      <h2>{searchedCity}</h2>
      <h3>{searchedCityWeather}</h3>
      <div 
        style={{
          backgroundImage: bgPhoto , backgroundRepeat: 'no-repeat',
           backgroundSize: '100% 100%', height:'150px', width:'150px'
        ,}}
      ></div>
      <div className="five-Days">{<WeekShow />}</div>
    </div>
  );
}
