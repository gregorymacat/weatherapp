import React from 'react';
import './WeatherCard.css';

function WeatherCard({location}) {
  return (
    <div className="card-body1">
      <div className="card-top">
        <h2>{location}</h2>
        <h2>Time</h2>
      </div>
      <div className="card-middle">
        <h1>Temperature</h1>
        <h3>Description</h3>
      </div>
      <div className="card-bottom">
        <div className="card-weather-info">
          <h2>Wind speed</h2>
          <h2>Precipitation %</h2>
          <div className="card-sun-times">
            <h2>Sunset</h2>
            <h2>Sunrise</h2>
          </div>
        </div>
        <img alt="weather condition image"></img>
      </div>
    </div>
  )
}

export default WeatherCard;