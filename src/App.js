import './App.css';
import Weather from './components/Weather';
import { Routes, BrowserRouter as HashRouter, Route } from 'react-router-dom';
import Favorites from './components/Favorites';
import Title from './components/Title';
import { useEffect, useState } from 'react';
import { useCityWeatherProvider } from './City.Provider';

function App() {
  // const key = '4k4wWlScDkI28jEhjxoniSZCvJgYkbZW';
  // const key = '9SEodDo9kGMypK9IsB8DjnvhesKD5IRz';
  const key ='WH3tbmkFRfOPa7P2BLOiyXHynDramr4G'

  const {
    favoritesCities,
    updateFavoritesCities,
    errors,
    updateErrors,
    searchedCity,
    updateSearchedCity,
    searchedCityWeather,
    updateSearchedCityWeather,
    allWeekDays,
    updateAllWeekDays,
  } = useCityWeatherProvider();
  const [isExist, setIsExist] = useState(false);
  const [id, setId] = useState('215854');

  useEffect(() => {
    getCityWeatherById('tel aviv');
  }, []);

  // useEffect(()=>{
  //   searchedCity,
  //   searchedCityWeather,
  //   allWeekDays
  // }, [getCityWeatherById])

  const getCityId = async (city) => {
    // get the id of the city that searched
    updateErrors(null);
    if (!city) {
      city = 'tel aviv';
    }
    try {
      const respoonse = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${city}`
      );
      if (!respoonse.ok) {
        throw new Error('Somthing went wrond');
      }
      const data = await respoonse.json();
      updateSearchedCity(data[0].LocalizedName);
      // console.log(data[0]);
      setId(data[0].Key);
    } catch (error) {
      updateErrors(error.message);
    }
  };

  const getCityWeatherById = async (cityToSearch) => {
    updateErrors(null);
    getCityId(cityToSearch);
    try {
      const response = await fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`
      );
      if (!response.ok) {
        throw new Error('Somthing went wrond');
      }
      const data = await response.json();
      updateSearchedCityWeather(
        data[0].Temperature.Metric.Value + `${data[0].Temperature.Metric.Unit}`
      );
      getWeatherForWeek();
      console.log(searchedCityWeather);
      setIsExist(
        favoritesCities.filter((c) => {
          return c.name === cityToSearch;
        }).length === 1
      );
    } catch (error) {
      updateErrors(error.message);
    }
  };

  const getWeatherForWeek = async () => {
    const response = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${key}`
    );
    const data = await response.json();

    // console.log(data.DailyForecasts);
    updateAllWeekDays(data.DailyForecasts);
  };

  const addOrRmoveFavorite = () => {
    // console.log('work');
    const city = {
      id: Math.random(),
      name: searchedCity,
      temp: searchedCityWeather,
      week: allWeekDays,
    };
    // console.log(city);
    if (
      favoritesCities.filter((c, i) => {
        return c.name === searchedCity;
      }).length === 0
    ) {
      updateFavoritesCities(city);
    } else {
      alert('City allready in favorites list!');
      setIsExist(true);
    }
    // console.log(favoritesCities);
  };

  return (
    <div className="App">
      <HashRouter>
        <Title />
        <Routes>
          <Route
            path="/"
            element={
              <Weather
                isExist={isExist}
                addToFavorite={addOrRmoveFavorite}
                getWeatherForWeek={getWeatherForWeek}
                searchedCityWeather={searchedCityWeather}
                city={getCityWeatherById}
                theCity={searchedCity}
                id={id}
                error={errors}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
