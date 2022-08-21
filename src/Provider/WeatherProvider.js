import React, { createContext, useContext, useState } from 'react';

export const weatherContext = createContext();

export function useWeatherProvider() {
  return useContext(weatherContext);
}

const WeatherProvider = ({ children }) => {
  const [cityData, setCityData] = useState({});
  const [favoritesCities, setFavoritesCities] = useState([]);

  const updateFavoritesCities = (city) => {
    setFavoritesCities([...favoritesCities, city]);
  };
  const removeFromFavoritesCities = (city) => {
    const newfavoritesCities = favoritesCities.filter((c) => {
      return c.name !== city.name;
    });
    setFavoritesCities(newfavoritesCities);
  };

  const updateCityData = (obj) => {
    setCityData(obj);
  };
  return (
    <weatherContext.Provider value={{ cityData, updateCityData, favoritesCities,  updateFavoritesCities, removeFromFavoritesCities}}>
      {children}
    </weatherContext.Provider>
  );
};

export default WeatherProvider;
