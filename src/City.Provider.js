import React, { useContext, useState, createContext } from 'react';

export const CityWeatherContext = createContext({});

export function useCityWeatherProvider() {
  return useContext(CityWeatherContext);
}

const CityWeatherProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [favoritesCities, setFavoritesCities] = useState([]);
  const [searchedCity, setSearchedCity] = useState('');
  const [searchedCityWeather, setSearchedCityWeather] = useState('');
  const [allWeekDays, setAllWeekDays] = useState([]);

  const updateErrors = (updatedErrors) => {
    setErrors(updatedErrors);
  };
  const updateAllWeekDays = (week) => {
    setAllWeekDays(week);
  };
  const updateSearchedCityWeather = (updatedErrors) => {
    setSearchedCityWeather(updatedErrors);
  };

  const updateSearchedCity = (cityName) => {
    setSearchedCity(cityName);
  };
  const updateFavoritesCities = (city) => {
    setFavoritesCities([...favoritesCities, city]);
  };

  return (
    <CityWeatherContext.Provider
      value={{
        errors,
        updateErrors,
        favoritesCities,
        updateFavoritesCities,
        searchedCityWeather,
        updateSearchedCityWeather,
        searchedCity,
        updateSearchedCity,
        allWeekDays,
        updateAllWeekDays,
      }}
    >
      {children}
    </CityWeatherContext.Provider>
  );
};
export default CityWeatherProvider;
