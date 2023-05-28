import React, {useState, useEffect} from 'react';
import axios from 'axios';

import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import './CardHolder.css';

import exampleHouWeatherData from '../../../exampleData/weatherData/houstonWeatherData.json';
import exampleEvoWeatherData from '../../../exampleData/weatherData/evoramonteWeatherData.json';

const houstonExampleData = {
  name: 'Houston',
  region: 'TX',
  weatherInfo: exampleHouWeatherData,
};
const evoraExampleData = {
  name: 'Evoramonte',
  region: 'PT',
  weatherInfo: exampleEvoWeatherData
}

function CardHolder({locations, units}) {
  const [weatherData, setWeatherData] = useState([houstonExampleData, evoraExampleData]);

  // !This should make API calls using Suspense instead of useEffect
  // ?It might also need a try catch block, look into it
  useEffect(() => {
    if (locations.length > 0) {
      const lastLocation = locations[locations.length - 1];
      console.log('Getting weather data for: ', lastLocation);
      getWeatherData(lastLocation)
    }
  }, [locations]);

  const getWeatherData = (location) => {
    axios.get('/forecasts/currentWeather', {
      params: {
        lat: location.lat,
        lon: location.lon,
      }
    })
      .then(response => {
        const weatherInfo = response.data;
        console.log('This is the weather info: ', weatherInfo);
        const locationData = {
          name: location.locale,
          region: location.region,
          weatherInfo,
        }
        const allLocationsWeatherData = weatherData.slice();

        console.log('This is the response from my API: ', weatherInfo);
        allLocationsWeatherData.push(locationData);
        setWeatherData(allLocationsWeatherData);
      })
      .catch(err => {
        console.error('Error making request to /forecasts/currentWeather: ', err);
      })
  }

  return (
    <section id="content-section">
      <div className="card-container">
        {
          weatherData.map(loc => (
            <WeatherCard location={loc} units={units}/>
          ))
        }
      </div>
    </section>
  )
}

export default CardHolder;