const key = '4k4wWlScDkI28jEhjxoniSZCvJgYkbZW';
let cityName = 'jerusalem';

const aoutoComplete = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${cityName}`; // חיפוש עיר ספציפית עם השלמה אוטו

const currentCondition = `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`; // מצב נוכחי של תחזית בעיר

const fiveDays = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}`; // מצב בחמישה ימים הבאים בעיר

('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=4k4wWlScDkI28jEhjxoniSZCvJgYkbZW&q=jerusalem');
('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=4k4wWlScDkI28jEhjxoniSZCvJgYkbZW&q=tel%20aviv');


