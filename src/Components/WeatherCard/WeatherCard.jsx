import React from 'react';
import './WeatherCard.css';

function WeatherCard({location, units, removeLocation}) {
  //TODO: Need to be able to remove a card
  const handleDeletion = (event) => {
    console.log(event.target.id);
    const removableLocation = {
      name: event.target.id.split(',')[0],
      region: event.target.id.split(',')[1],
    }
    removeLocation(removableLocation);
  }
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
    return `${Math.round(location.weatherInfo.main.temp)}°${units === 'imperial' ? 'F' : 'C'}`;
  }

  const selectWeatherIcon = (condition) => {
    switch (condition) {
      //Snow
      //Thunderstorm
      //Rain
      case 'Rain':
        return <img src="water-drops.png" width="60px" height="60px"></img>
      case 'Snow':
        return <img src="snowflakes.png" width="60px" height="60px"></img>
      case 'Thunderstorm':
        return <img src="bolt.png" width="60px" height="60px"></img>
      case 'Clear':
        return <img src="sun.png" width="60px" height="60px"></img>
      default:
        return <img src="sun.png" width="60px" height="60px"></img>
    }
  }

  const time = getCurrentTime(location.weatherInfo.timezone);
  const temp = formatTemperature();
  const description = location.weatherInfo.weather[0].description;
  const windSpeed = (location.weatherInfo.wind.speed).toString() + ` ${units === 'imperial' ? 'mph' : 'km/h'}`;
  //const precipitationProb = location.weatherInfo.list.pop; //Needs to be retrieved from hourly-forecast API call
  const sunriseTime = convertUnixTime(location.weatherInfo.sys.sunrise);
  const sunsetTime = convertUnixTime(location.weatherInfo.sys.sunset);

  //TODO: Add precipitation maybe? Either that or it can be on other side of card
  return (
    <div className="card-body">
      <div className="card-top">
        <h2 id="location-name">{location.name}, {location.region}</h2>
        <h2>{time}</h2>
      </div>
      <div className="card-middle">
        <h1>{temp}</h1>
        <h3>{description}</h3>
      </div>
      <div className="card-bottom">
        <div className="card-weather-info">
          <div className="card-wind-speed">
            <h2>{windSpeed}</h2>
            <img src="windspeed.png" width="22px" height="22px"></img>
          </div>
          {/* <h2>Precipitation %</h2> */}
          <div className="card-sun-times">
            <div>
              <h2>{sunriseTime}</h2>
              <img src="sunrise.png" width="25px" height="25px"></img>
            </div>
            <div>
              <h2>{sunsetTime}</h2>
              <img src="sunset.png" width="25px" height="25px"></img>
            </div>
          </div>
        </div>
        <div className="card-bottom-right-container">
          {selectWeatherIcon(location.weatherInfo.weather[0].main)}
          <span id={`${location.name},${location.region}`} onClick={handleDeletion}>x</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard;