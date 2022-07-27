import React from 'react';
import { useCityWeatherProvider } from '../City.Provider';

export default function WeekShow() {
  const { allWeekDays } = useCityWeatherProvider();

  return (
    <div>
      {allWeekDays.map((d, i) => {
        return (
          <div key={i} className={'weekly'}>
            <p>{d.nameOfDay}</p>
            <p>{d.temperature}</p>
          </div>
        );
      })}
    </div>
  );
}
