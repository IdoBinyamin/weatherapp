import React, { useContext, useState, createContext } from 'react';

export const CityWeatherContext = createContext({});

export function useCityWeatherProvider() {
  return useContext(CityWeatherContext);
}

const CityWeatherProvider = ({ children }) => {
  const [errors, setErrors] = useState('');
  const [favoritesCities, setFavoritesCities] = useState([]);
  const [searchedCity, setSearchedCity] = useState('');
  const [searchedCityWeather, setSearchedCityWeather] = useState('');
  const [allWeekDays, setAllWeekDays] = useState([]);
  const [isExsist, setIsExist] = useState(false);
  const [currCondition, setCurrCondition] = useState('');

  const updateErrors = (updatedErrors) => {
    setErrors(updatedErrors);
  };
  const updateCurrCondition = (currCondition) => {
    setCurrCondition(currCondition);
  };
  const updateIsExsist = (isExsist) => {
    setIsExist(isExsist);
  };
  const updateAllWeekDays = (week) => {
    setAllWeekDays(week);
  };
  const updateSearchedCityWeather = (cityTemp) => {
    setSearchedCityWeather(cityTemp);
  };

  const updateSearchedCity = (cityName) => {
    setSearchedCity(cityName);
  };
  const updateFavoritesCities = (city) => {
    setFavoritesCities([...favoritesCities, city]);
  };
  const updateRemoveFavoritesCities = (city) => {
    setFavoritesCities(city);
  };

  return (
    <CityWeatherContext.Provider
      value={{
        errors,
        updateErrors,
        favoritesCities,
        updateFavoritesCities,
        updateRemoveFavoritesCities,
        searchedCityWeather,
        updateSearchedCityWeather,
        searchedCity,
        updateSearchedCity,
        allWeekDays,
        updateAllWeekDays,
        updateIsExsist,
        isExsist,
        currCondition,
        updateCurrCondition,
      }}
    >
      {children}
    </CityWeatherContext.Provider>
  );
};
export default CityWeatherProvider;
