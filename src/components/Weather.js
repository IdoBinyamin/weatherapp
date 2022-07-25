import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Weather(props) {
  const [searchedCity, setSearchedCity] = useState('');
  const cityToSearch = useRef();
  const navigation = useNavigate();

  const searchCity = () => {
    if (cityToSearch.current.value === '') {
      alert('No city to search');
      return;
    }
    for (let i = 0; i < props.cityList.length; i++) {
      console.log(props.cityList[i]);
      if (
        props.cityList[i].name
          .toLowerCase()
          .includes(cityToSearch.current.value.toLowerCase())
      ) {
        setSearchedCity(props.cityList[i]);
        break;
      }
    }
  };
  return (
    <div>
      <input ref={cityToSearch} type={'search'} placeholder="Enter city name" />

      <button onClick={searchCity}>Search</button>
      <button>Add to Favorite</button>
      <h2>{searchedCity.name || 'The city'}</h2>
      <h3>{searchedCity.temp || 'The weather'}</h3>
    </div>
  );
}
