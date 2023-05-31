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

//TODO: Add explanation text when there are no cards yet "Search for location above please" or something
function CardHolder({locations, units}) {
  //[houstonExampleData, evoraExampleData]
  const [weatherData, setWeatherData] = useState([]);

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
          weatherData.length > 0 ? 
            weatherData.map(loc => (
              <WeatherCard location={loc} units={units}/>
            ))
            : <span>Please search for a location above</span>
        }
      </div>
    </section>
  )
}

export default CardHolder;