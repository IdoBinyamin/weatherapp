import React, { useState } from 'react';
import './Title.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Title() {
  const navigate = useNavigate();
  return (
    <div className="headline-title">
      <h1
        onClick={() => {
          navigate('/');
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
