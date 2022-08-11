import React from 'react';
import './Title.css';
import { useNavigate } from 'react-router-dom';

export default function Title() {
  // const HOME = ;
  // const FAVORITE = 
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
         Favorites
      </h1>
    </div>
  );
}
