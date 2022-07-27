import './App.css';
import Weather from './components/Weather';
import { Routes, BrowserRouter as HashRouter, Route } from 'react-router-dom';
import Favorites from './components/Favorites';
import Title from './components/Title';
import { useEffect, useState } from 'react';
import { useCityWeatherProvider } from './City.Provider';

function App() {
  const key = 'GPuKQJeTclafwDh4L3wNyve3YqOP2sca';
  // const key = '4k4wWlScDkI28jEhjxoniSZCvJgYkbZW';
  // const key = '9SEodDo9kGMypK9IsB8DjnvhesKD5IRz';
  // const key = 'WH3tbmkFRfOPa7P2BLOiyXHynDramr4G';

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

  const getCityWeatherById = async (cityToSearch) => {
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
      updateSearchedCityWeather(
        data[0].Temperature.Metric.Value + `${data[0].Temperature.Metric.Unit}`
      );
      // console.log(searchedCityWeather);
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
    let res = dateDataHandler(data.DailyForecasts);
    updateAllWeekDays(res);
  };

  const dateDataHandler = (daysOfTheWeek) => {
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const improveArr = [];
    for (let i = 0; i < daysOfTheWeek.length; i++) {
      let specificDay = new Date(daysOfTheWeek[i].Date);
      let numOfDayName = specificDay.getDay();
      let dayName = weekday[numOfDayName];
      let temperature = `${
        ((daysOfTheWeek[i].Temperature.Maximum.Value - 32) * 5) / 9
      }c`;
      improveArr.push({
        nameOfDay: dayName,
        temperature: temperature,
      });
    }
    return improveArr
  };

  const addOrRmoveFavorite = () => {
    const city = {
      id: Math.random(),
      name: searchedCity,
      temp: searchedCityWeather,
      week: allWeekDays,
    };
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
