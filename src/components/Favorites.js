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
    updateCurrCondition,
  } = useCityWeatherProvider();

  const navigate = useNavigate('');

  const getFavoriteDetails = (name, temp, week, skyCondition) => {
    updateSearchedCityWeather(temp);
    updateSearchedCity(name);
    updateAllWeekDays(week);
    updateCurrCondition(skyCondition);

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
                  getFavoriteDetails(c.name, c.temp, c.week, c.skyCondition);
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
