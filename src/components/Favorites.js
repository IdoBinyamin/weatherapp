import React from 'react';
import { useCityWeatherProvider } from '../City.Provider';
import './Favorites.css'

export default function Favorites(props) {
const {favoritesCities} = useCityWeatherProvider()

  return (
    <div className='favorite-page'>
      {favoritesCities.map((c, i) => {
        return (
          <div key={i} className="favorite-city">
            <p>{c.name}</p>
            <p>{c.temp}</p>
          </div>
        );
      })}
    </div>
  );
}
