import React from 'react';
import './Favorites.css'

export default function Favorites(props) {
  return (
    <div className='favorite-page'>
      {props.favoList.map((c, i) => {
        return (
          <div key={i} className="favorite-city">
            <p>{c.name}</p>
            <p>{c.temp}</p>
          </div>
        );
      })}
    </div>
  );
}
