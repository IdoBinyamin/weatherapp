import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Title.css'

export default function Title() {
  const navigate = useNavigate();
  return (
    <div className="headline-title">
      <h1 id='hom'
        onClick={() => {
          navigate('/');
        }}
      >
       <i className="fa fa-home"></i> Home
      </h1>
      <h1 id='fav'
        onClick={() => {
          navigate('/favorites');
        }}
      >
       &#9734; Favorites
      </h1>
    </div>
  );
}
