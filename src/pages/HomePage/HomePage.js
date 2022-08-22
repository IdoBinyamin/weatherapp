import React from 'react';
import SearchCity from '../../components/Search/SearchCity';
import ShowWeather from '../../components/ShowWeather/ShowWeather';
import './HomePage.css';
import { useWeatherProvider } from '../../Provider/WeatherProvider';

export default function HomePage(props) {
  const { favoritesCities } = useWeatherProvider();
  const catchCity = (e) => {
    e.preventDefault();
    if (
      e.target[0].value.toLowerCase() > 'a' &&
      e.target[0].value.toLowerCase() < 'z'
    ) {
      props.getCityIdInApi(e.target[0].value);
      cheackForFavoriteBtn(e.target[0].value);
    } else {
      alert('Search only in English!');
      return;
    }
  };

  const cheackForFavoriteBtn = (cityName) => {
    const exsist = favoritesCities.filter((c, i) => {
      return c.name.toLowerCase() === cityName.toLowerCase();
    });

    if (exsist.length > 0) {
      return props.updateIsExsist(true);
    } else return props.updateIsExsist(false);
  };

  return (
    <div className="main-page">
      <SearchCity searchCity={catchCity} setIsExsist={props.updateIsExsist} />
      <p id="error">{props.error}</p>
      <ShowWeather
        isExsist={props.isExsist}
        setIsExsist={props.updateIsExsist}
      />
    </div>
  );
}
