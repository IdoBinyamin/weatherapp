import React from 'react';
import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <div>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      <Link to={'/favorites'}>
        <button>Favorites</button>
      </Link>
    </div>
  );
}
