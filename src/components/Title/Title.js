import React from 'react';
import './Title.css';
import { useNavigate } from 'react-router-dom';

export default function Title() {
 
  const navigate = useNavigate();
  return (
    <div className="headline-title">
      <h1
        onClick={() => {
          navigate('/weatherapp');
        }}
      >
       Home
      </h1>
      <h1
        onClick={() => {
          navigate('/favorites');
        }}
      >
        &#9734; Favorites
      </h1>
    </div>
  );
}
