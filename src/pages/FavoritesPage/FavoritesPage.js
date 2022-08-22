import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeatherProvider } from '../../Provider/WeatherProvider';
import './FavoritesPage.css';

export default function FavoritesPage(props) {
  const { favoritesCities } = useWeatherProvider();
  const navigate = useNavigate();
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
                  props.getCityIdInApi(c.name);
                  props.updateIsExsist(true);
                  navigate('/');
                }}
              >
                <p>{c.name}</p>
                <p>{c.temp}&#8451;</p>
              </div>
            );
          })
        : 'No favorites cities'}
    </div>
  );
}
