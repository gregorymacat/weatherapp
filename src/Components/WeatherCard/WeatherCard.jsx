import React from 'react';
import './WeatherCard.css';

function WeatherCard({location, units}) {
  const getCurrentTime = (timezoneOffset) => {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const currentTime = new Date(utc + (3600000 * timezoneOffset));
    const formattedCurrentTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    
    //Regex helps remove leading zeroes without changing to a specific time format, allowing 24 hour time format
    return formattedCurrentTime.replace(/^(?:00:)?0?/, '');
  }
  const convertUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const formattedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return formattedTime.replace(/^(?:00:)?0?/, '');
  }
  const formatTemperature = () => {
    if (units === 'imperial') {
      return `${Math.round(location.weatherInfo.main.temp)}°F`
    } else {
      return `${location.weatherInfo.main.temp}°C`
    }
  }

  const time = getCurrentTime(location.weatherInfo.timezone);
  const temp = formatTemperature();
  const description = location.weatherInfo.weather[0].description;
  const windSpeed = (location.weatherInfo.wind.speed).toString() + ` ${units === 'imperial' ? 'mph' : 'km/h'}`;
  //const precipitationProb = location.weatherInfo.list.pop; //Needs to be retrieved from hourly-forecast API call
  const sunriseTime = convertUnixTime(location.weatherInfo.sys.sunrise);
  const sunsetTime = convertUnixTime(location.weatherInfo.sys.sunset);

  return (
    <div className="card-body1">
      <div className="card-top">
        <h2>{location.name}</h2>
        <h2>{time}</h2>
      </div>
      <div className="card-middle">
        <h1>{temp}</h1>
        <h3>{description}</h3>
      </div>
      <div className="card-bottom">
        <div className="card-weather-info">
          <h2>{windSpeed}</h2>
          <h2>Precipitation %</h2>
          <div className="card-sun-times">
            <h2>{sunriseTime}</h2>
            <h2>{sunsetTime}</h2>
          </div>
        </div>
        <img alt="weather condition image"></img>
      </div>
    </div>
  )
}

export default WeatherCard;