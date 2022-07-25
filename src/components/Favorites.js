import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Favorites(props) {
  const navigation = useNavigate();
  return (
    <div>
      {props.favoList.map((c, i) => {
        return (
          <div key={i} className="favorite-city">
            <p>City name: {c.name}</p>
            <p>Temp: {c.temp}</p>
          </div>
        );
      })}
    </div>
  );
}
