require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Example calls
// http://localhost:3000/hourlyForecast?lat=48.8534951&lon=2.3483915;
// Takes latitude and longitude recieved from /retrieve in Mapbox's Search Box API
// Passes those two as parameters to OpenWeather's oneDayForecast API 
router.get('/currentWeather', (req, res) => {
  const {lat, lon} = req.query;

  axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      units: 'imperial', //Add options for this eventually
      appid: process.env.OPENWEATHER_KEY,
    }
  })
    .then(response => {
      console.log('This is the response.data: ', response.data);
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.error('Error making request to OpenWeather API: ', err);
      res.sendStatus(400);
    })
})

module.exports = router;