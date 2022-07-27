import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CityWeatherProvider from './City.Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CityWeatherProvider>
      <App />
    </CityWeatherProvider>
  </React.StrictMode>
);
