import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Title from './components/Title';
import { useWeatherProvider } from './Provider/WeatherProvider';
import { useEffect, useState } from 'react';

function App() {
  const { updateCityData } = useWeatherProvider();
  const [error, setError] = useState(null);
  const key = 'WH3tbmkFRfOPa7P2BLOiyXHynDramr4G';

  useEffect(() => {
    getCityIdInApi('tel aviv');
  }, []);

  let cityDataBuild = {
    name: '',
    weather: '',
    icon: '',
    weekly: '',
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

  const getWeatherForWeek = async (id) => {
    try {
      const response = await fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${key}`
      );
      if (!response.ok) {
        throw new Error('Somthing went wrond');
      }
      const data = await response.json();
      cityDataBuild.weekly = dateDataHandler(data.DailyForecasts);
      updateCityData(cityDataBuild);
    } catch (error) {
      setError(error.message);
    }
  };

  const getCityWeatherInApi = async (id) => {
    try {
      const response = await fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`
      );
      if (!response.ok) {
        throw new Error('Somthing went wrond');
      }
      const data = await response.json();
      cityDataBuild.weather = data[0].Temperature.Metric.Value;
      cityDataBuild.icon = data[0].WeatherIcon;
      getWeatherForWeek(id);
    } catch (error) {
      setError(error.message);
    }
  };

  const getCityIdInApi = async (name) => {
    setError(null);
    try {
      const respoonse = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${name}`
      );
      if (!respoonse.ok) {
        throw new Error('Somthing went wrond');
      }
      const data = await respoonse.json();
      getCityWeatherInApi(data[0].Key);
      cityDataBuild.name = data[0].LocalizedName;
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="App">
      <HashRouter>
        <Title />
        <Routes>
          <Route
            path="/"
            element={<HomePage getCityIdInApi={getCityIdInApi} error={error}  />}
          />
          <Route
            path="/favorites"
            element={<FavoritesPage getCityIdInApi={getCityIdInApi}/>}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
