import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import './CardHolder.css';

function CardHolder({locations}) {
  return (
    <section id="content-section">
      <div className="card-container">
        {
          locations.map(loc => (
            <WeatherCard location={loc}/>
          ))
        }
      </div>
    </section>
  )
}

export default CardHolder;