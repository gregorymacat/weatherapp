import React, {useState, useEffect} from 'react';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import axios from 'axios';
import './CardHolder.css';

function CardHolder({locations, units}) {
  const [weatherData, setWeatherData] = useState([]);

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
          weatherInfo,
        }
        const allLocations = weatherData.slice();

        console.log('This is the response from my API: ', weatherInfo);
        allLocations.push(locationData);
        setWeatherData(allLocations);
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