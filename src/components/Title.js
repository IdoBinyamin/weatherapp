import React from 'react';
import './Title.css'
import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <div className='headline-title'>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      <Link to={'/favorites'}>
        <button>Favorites</button>
      </Link>
    </div>
  );
}
