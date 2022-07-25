import './App.css';
import Weather from './components/Weather';
import { hashRouter , Routes, Route } from 'react-router-dom';
import Favorites from './components/Favorites';
import Title from './components/Title';
function App() {
  let user1 = new User();
  let cities = [
    { name: 'Sderot', temp: '27c' },
    { name: 'Yeruham', temp: '31c' },
    { name: 'Tel-Aviv', temp: '29c' },
    { name: 'Tiberia', temp: '28c' },
  ];
  return (
    <div className="App">
      <hashRouter>
        <Title />
        <Routes>
          <Route
            path="/"
            element={<Weather user={user1} cityList={cities} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favoList={user1.favoritesCity} />}
          />
        </Routes>
      </hashRouter>
    </div>
  );
}

export default App;

class User {
  favoritesCity = [
    { city: 'Sderot', temp: '27c', wind: '3km', moist: '10%' },
    { city: 'Yeruham', temp: '31c', wind: '10km', moist: '5%' },
  ];
  addCity(city) {
    this.favoritesCity.push(city);
  }
}
