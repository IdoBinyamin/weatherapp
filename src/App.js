import './App.css';
import Weather from './components/Weather/Weather';
import { Routes, BrowserRouter as HashRouter, Route } from 'react-router-dom';
import Favorites from './components/Favorites/Favorites';
import Title from './components/Title/Title';
import { useEffect, useState } from 'react';
import { useCityWeatherProvider } from './City.Provider';

function App() {
  
  const key = 'WH3tbmkFRfOPa7P2BLOiyXHynDramr4G';

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
    updateIsExsist,
    currCondition,
    updateCurrCondition,
  } = useCityWeatherProvider();
  
  const [id, setId] = useState('');

  useEffect(() => {
    getCityWeatherInfo('tel aviv');
  }, []);

  const getCityId = async (city) => {
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
      setId(data[0].Key);
    } catch (error) {
      updateErrors(error.message);
    }
  };

  const getCityWeatherInfo = async (cityToSearch = 'tel aviv') => {
    updateErrors(null);
    getCityId(cityToSearch);
    getWeatherForWeek();

    try {
      const response = await fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`
      );
      if (!response.ok) {
        throw new Error('Somthing went wrond');
      }
      const data = await response.json();
      updateSearchedCityWeather(data[0].Temperature.Metric.Value);
      updateCurrCondition(data[0].WeatherIcon);
     
      updateIsExsist(
        favoritesCities.filter((c) => {
          return c.name === cityToSearch;
        }).length === 1
      );
    } catch (error) {
      updateErrors(error.message);
    }
  };

  const getWeatherForWeek = async () => {
    try {
      const response = await fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${key}`
      );
      const data = await response.json();
      let res = dateDataHandler(data.DailyForecasts);
      updateAllWeekDays(res);
    } catch (error) {
      updateErrors(error.message);
    }
  };

  const dateDataHandler = (daysOfTheWeek) => {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const listOfDaysAndTemp = [];
    for (let i = 0; i < daysOfTheWeek.length; i++) {
      let specificDay = new Date(daysOfTheWeek[i].Date);
      let numOfDayName = specificDay.getDay();
      let dayName = weekday[numOfDayName];
      let temperature = Math.round(
        ((daysOfTheWeek[i].Temperature.Maximum.Value - 32) * 5) / 9
      );
      listOfDaysAndTemp.push({
        nameOfDay: dayName,
        temperature: temperature,
      });
    }
    return listOfDaysAndTemp;
  };

  const addOrRmoveFavorite = () => {
    const city = {
      id: Math.random(),
      name: searchedCity,
      temp: searchedCityWeather,
      week: allWeekDays,
      skyCondition: currCondition,
    };

    if (
      favoritesCities.filter((c) => {
        return c.name === searchedCity;
      }).length === 0
    ) {
      updateFavoritesCities(city);
    } else {
      alert('City allready in favorites list!');
      updateIsExsist(true);
    }
  };

  return (
    <div className="App">
      <HashRouter>
        <Title defaultCity={getCityWeatherInfo} />
        <Routes>
          <Route
            path="/weatherapp"
            element={
              <Weather
                addToFavorite={addOrRmoveFavorite}
                getWeatherForWeek={getWeatherForWeek}
                searchedCityWeather={searchedCityWeather}
                cityInfo={getCityWeatherInfo}
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
