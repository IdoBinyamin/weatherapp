import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCityWeatherProvider } from '../City.Provider';
import './Favorites.css';

export default function Favorites(props) {
  const { favoritesCities, updateSearchedCityWeather, updateSearchedCity } =
    useCityWeatherProvider();
  const navigate = useNavigate('');
  const getFavoriteDetails = (name, temp) => {
    updateSearchedCityWeather(temp);
    updateSearchedCity(name);
    navigate('/');
  };
  return (
    <div className="favorite-page">
      {favoritesCities.map((c, i) => {
        return (
          <div
            key={i}
            className="favorite-city"
            onClick={() => {
              getFavoriteDetails(c.name, c.temp);
            }}
          >
            <p>{c.name}</p>
            <p>{c.temp}</p>
          </div>
        );
      })}
    </div>
  );
}
