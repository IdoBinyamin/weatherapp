import React from 'react';

export default function Favorites(props) {
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
