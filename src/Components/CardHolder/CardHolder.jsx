import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import './CardHolder.css';

function CardHolder() {
  return (
    <div className="card-container">
      <WeatherCard/>
      <WeatherCard/>
      {/* <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/>
      <WeatherCard/> */}
    </div>
  )
}

export default CardHolder;