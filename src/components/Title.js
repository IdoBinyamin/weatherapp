import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Title() {
    const navigation = useNavigate()
  return (
    <div>
        <button onClick={() => {
          navigation('/');
        }}>Home</button>
        <button onClick={() => {
          navigation('/favorites');
        }}>Favorites</button>
    </div>
  )
}
