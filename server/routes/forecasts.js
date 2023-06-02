require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Example calls
// http://localhost:3000/hourlyForecast?lat=48.8534951&lon=2.3483915;
// Takes latitude and longitude recieved from /retrieve in Mapbox's Search Box API
// Passes those two as parameters to OpenWeather's oneDayForecast API 
router.get('/currentWeather', (req, res) => {
  const {lat, lon, units} = req.query;
  console.log('Units are: ', units);
  console.log('Type of units: ', typeof(units));

  axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      units,
      appid: process.env.OPENWEATHER_KEY,
    }
  })
    .then(response => {
      console.log('Weather response data: ', response.data);
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.error('Error making request to OpenWeather API: ', err);
      res.status(err.response.status).send(err);
    })
})

//need to add route for forecasted weather. this will allow showing precipication %
//and eventually the chart that shows different weather conditions throughout the day (temp, precip, wind, ...etc)

module.exports = router;