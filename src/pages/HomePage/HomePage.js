import React, { useState } from 'react';
import SearchCity from '../../components/SearchCity';
import ShowWeather from '../../components/ShowWeather';
import './HomePage.css';

export default function HomePage(props) {
  const [isExsist, setIsExsist] = useState(false);
  const catchCity = (e) => {
    e.preventDefault();

    if (
      e.target[0].value.toLowerCase() > 'a' &&
      e.target[0].value.toLowerCase() < 'z'
    ) {
      props.getCityIdInApi(e.target[0].value);
    } else {
      alert('Search only in English!');
      return;
    }
  };
  const updateIsExsist = (stage) => {
    setIsExsist(stage);
  };

  return (
    <div className="main-page">
      <SearchCity searchCity={catchCity}  setIsExsist={updateIsExsist}/>
      <ShowWeather isExsist={isExsist} setIsExsist={updateIsExsist} />
    </div>
  );
}
