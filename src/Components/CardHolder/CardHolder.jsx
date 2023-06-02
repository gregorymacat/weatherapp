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
  weatherInfo: exampleEvoWeatherData,
}

function CardHolder({locations, units}) {
  //[houstonExampleData, evoraExampleData]
  const [weatherData, setWeatherData] = useState([]);

  // !This should make API calls using Suspense instead of useEffect
  // ?It might also need a try catch block, look into it
  useEffect(() => {
    if (locations.length > 0) {
      // const lastLocation = locations[locations.length - 1];

      // getOneLocationsWeatherData(lastLocation);
      getAllLocationsWeatherData();
    }
  }, [locations, units]);

  const getOneLocationsWeatherData = (location) => {
    console.log('Creating promise to be returned');
    return new Promise((resolve, reject) => {
      console.log('Getting one locations weather data');
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
          console.log('Returning one locations weather data: ', locationData);
  
          resolve(locationData);
        })
        .catch(err => {
          console.error('Error making request to /forecasts/currentWeather: ', err);
          reject(err);
        })
    })
    
  }

  const getAllLocationsWeatherData = () => {
    console.log('Creating promises of all locations weather data')
    const weatherDataPromises = locations.map(location => {
      return getOneLocationsWeatherData(location);
      // return new Promise((resolve, reject) => {
      //   const weatherData = getOneLocationsWeatherData(location);

      //   if (weatherData.name) {
      //     resolve(weatherData);
      //   } else {
      //     reject();
      //   }
      // })
    });
    
    weatherDataPromises.push(new Promise((resolve, reject) => {
      setTimeout(() => reject('Took a while to fail'), 5000);
    }))
    console.log('Created promises of all locations weather data: ', weatherDataPromises)

    console.log('Calling promises of all locations weather data')

    Promise.allSettled(weatherDataPromises)
      .then((results) => {
        console.log('All promises settled')
        const fulfilledWeatherData = [];

        results.forEach((result) => {
          if (result.status === 'fulfilled') {
            fulfilledWeatherData.push(result.value);
          }
          //TODO: Add error card that lets user know there was an issue getting data for that location, if status is rejected
        })
        console.log('Fulfilled weather data: ', fulfilledWeatherData);
        setWeatherData(fulfilledWeatherData);
      })
    
    console.log('Finishing calling getAllLocationsWeatherData');
  }

  return (
    <section id="content-section">
      <div className="card-container">
        {
          weatherData.length > 0 ? 
            weatherData.map(loc => (
              <WeatherCard location={loc} units={units}/>
            ))
            : <span id="tooltip">Please search for a location above</span>
        }
      </div>
    </section>
  )
}

export default CardHolder;