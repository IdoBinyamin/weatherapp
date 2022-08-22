import React from 'react';
import { useWeatherProvider } from '../../Provider/WeatherProvider';
import './ShowWeather.css';
export default function ShowWeather(props) {
  const {
    cityData,
    updateFavoritesCities,
    favoritesCities,
    removeFromFavoritesCities,
  } = useWeatherProvider();

  const handleAddFavoriteBtn = () => {
    let city = {
      name: '',
      temp: '',
      isFavorite: false,
    };
    let exsist = favoritesCities.filter((c, i) => {
      return c.name === cityData.name;
    });
    if (exsist.length > 0) {
      props.setIsExsist(false);
      removeFromFavoritesCities(exsist[0]);
      return;
    } else {
      city.name = cityData.name;
      city.temp = cityData.weather;
      city.isFavorite = true;
      props.setIsExsist(true);
      updateFavoritesCities(city);
    }
  };
  return (
    <div>
      <div className="details">
        <h2>
          {cityData.name}{' '}
          <span
            className="favorite-btn"
            style={{ color: `${props.isExsist ? 'yellow' : ''}` }}
            onClick={handleAddFavoriteBtn}
          >
            &#9734;
          </span>{' '}
        </h2>
        <h3> {cityData.weather} &#8451;</h3>
        <div className="icon">
          <div
            id={'icon'}
            style={{
              display: 'flex',
              backgroundImage: `url("https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${
                cityData.icon < 10 ? '0' + cityData.icon : cityData.icon
              }-s.png")`,
            }}
          ></div>
        </div>
      </div>
      <div className="five-Days">
        {cityData.weekly &&
          cityData.weekly.map((d, i) => {
            return (
              <div key={i} className={'day'}>
                <p className="write-to-center" id="day-name">
                  {d.nameOfDay}
                </p>
                <p className="write-to-center" id="day-temp">
                  {d.temperature} &#8451;
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
