import './App.css';
import Weather from './components/Weather';
import { Routes, BrowserRouter as HashRouter, Route } from 'react-router-dom';
import Favorites from './components/Favorites';
import Title from './components/Title';
import { useRef, useState } from 'react';

function App() {
  const [searchedCity, setSearchedCity] = useState('');
  const [error, setError] = useState(null);
  const [searchedCityWeather, setSearchedCityWeather] = useState('');
  const cityToSearch = useRef('');
  let week = [];
  const favoritesCitys = [
    { name: 'Sderot', temp: '27c', week: [] },
    { name: 'Yeruham', temp: '31c', week: [] },
  ];

  // const key = '4k4wWlScDkI28jEhjxoniSZCvJgYkbZW';
  const key = '9SEodDo9kGMypK9IsB8DjnvhesKD5IRz';
  const [id, setId] = useState('215854');

  const getCityId = async (city) => {
    setError(null);
    if (!city) {
      city = 'tel aviv';
    }
    try {
      const respoonse = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${city}`
      );
      if (!respoonse.ok) {
        throw new Error('Somthing went wrond');
      }
      const data = await respoonse.json();
      setSearchedCity(data[0].LocalizedName);
      // console.log(data[0]);
      setId(data[0].Key);
    } catch (error) {
      setError(error.message);
    }
  };

  const searchCity = async () => {
    getCityId(cityToSearch.current.value);
    setError(null);
    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`
      );
      if (!response.ok) {
        throw new Error('Somthing went wrond');
      }
      const data = await response.json();
      setSearchedCityWeather(
        data[0].Temperature.Metric.Value + `${data[0].Temperature.Metric.Unit}`
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const getWeatherForWeek = async () => {
    const response = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${key}`
    );
    const data = await response.json();

    console.log(data.DailyForecasts);
    data.DailyForecasts.map((d) => {
      return week.push({
        date: d.Date,
        min: d.Temperature.Minimum.Value,
        max: d.Temperature.Maximum.Value,
      });
    });
    console.log(week);
  };

  const addToFavorite = () => {
    const city = {
      name: searchedCity,
      temp: searchedCityWeather,
      week: [],
    };
    favoritesCitys.push(city);
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
              addToFavorite={addToFavorite}
                getWeatherForWeek={getWeatherForWeek}
                searchedCityWeather={searchedCityWeather}
                cityToSearch={cityToSearch}
                city={searchCity}
                theCity={searchedCity}
                id={id}
                error={error}
              />
            }
          />
          <Route
            path="/favorites"
            element={<Favorites favoList={favoritesCitys} />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
