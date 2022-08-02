import React from 'react';
import { useCityWeatherProvider } from '../City.Provider';

export default function WeekShow() {
  const { allWeekDays } = useCityWeatherProvider();

  return (
    <div className="weekly">
      {allWeekDays.map((d, i) => {
        return (
          <div key={i} className={'day'}>
            <p className='write-to-center' id='day-name'>{d.nameOfDay}</p>
            <p className='write-to-center' id='day-temp'>{d.temperature}</p>
          </div>
        );
      })}
    </div>
  );
}
