import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCityWeatherProvider } from '../City.Provider';
import './Favorites.css';

export default function Favorites(props) {
  const {
    favoritesCities,
    updateSearchedCityWeather,
    updateAllWeekDays,
    updateSearchedCity,
  } = useCityWeatherProvider();

  const navigate = useNavigate('');

  const getFavoriteDetails = (name, temp, week) => {
    updateSearchedCityWeather(temp);
    updateSearchedCity(name);
    updateAllWeekDays(week);
    navigate('/');
  };
  return (
    <div className="favorite-page">
      {favoritesCities.length !== 0
        ? favoritesCities.map((c, i) => {
            return (
              <div
                key={i}
                id={i}
                className="favorite-city"
                onClick={() => {
                  getFavoriteDetails(c.name, c.temp, c.week);
                }}
                style={{
                  backgroundImage: `url(${'../img/icons/08-s.png'})`,
                }}
              >
                <p>{c.name}</p>
                <p>{c.temp}</p>
              </div>
            );
          })
        : 'No favorites cities'}
    </div>
  );
}
