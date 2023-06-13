import React, {useState, useEffect} from 'react';
import axios from 'axios';

import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import './Cards.css';

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
  weatherInfo: exampleEvoWeatherData,
}

function Cards({locations, units, handleAreaSelect, removeLocation}) {
  //[houstonExampleData, evoraExampleData]
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if (locations.length > 0) {
      // const lastLocation = locations[locations.length - 1];

      // getOneLocationsWeatherData(lastLocation);
      getAllLocationsWeatherData();
    } else if (locations.length === 0){
      setWeatherData([]);
    }
  }, [locations, units]);

  const getOneLocationsWeatherData = (location) => {
    return new Promise((resolve, reject) => {
      axios.get('/forecasts/currentWeather', {
        params: {
          lat: location.lat,
          lon: location.lon,
          units,
        }
      })
        .then(response => {
          const weatherInfo = response.data;
          const locationData = {
            name: location.locale,
            region: location.region,
            weatherInfo,
          }
  
          resolve(locationData);
        })
        .catch(err => {
          console.error('Error making request to /forecasts/currentWeather: ', err);
          reject(err);
        })
    })
  }

  const getAllLocationsWeatherData = () => {
    const weatherDataPromises = locations.map(location => {
      return getOneLocationsWeatherData(location);
    });

    // weatherDataPromises.push(new Promise((resolve, reject) => {setTimeout(() => {reject(new Error)}, 5000)}));

    Promise.allSettled(weatherDataPromises)
      .then((results) => {
        const fulfilledWeatherData = [];

        results.forEach((result) => {
          if (result.status === 'fulfilled') {
            fulfilledWeatherData.push(result.value);
          }
          //TODO: Add error card that lets user know there was an issue getting data for that location, if status is rejected
        })
        setWeatherData(fulfilledWeatherData);
      })
    }

  return (
    <section id="content-section" onClick={handleAreaSelect}>
      <div className="card-container">
        {
          weatherData.length > 0 ? 
            weatherData.map(loc => (
              <WeatherCard location={loc} units={units} removeLocation={removeLocation}/>
            ))
            : <span id="tooltip">Please search for a location at the top right</span>
        }
      </div>
    </section>
  )
}

export default Cards;