const express = require('express');
const router = express.Router();

// Example calls
// http://localhost:3000/oneDayForecast?lat=48.8534951&long=2.3483915;
// Takes latitude and longitude recieved from /retrieve in Mapbox's Search Box API
// Passes those two as parameters to OpenWeather's oneDayForecast API 
router.get('/oneDayForecast')

module.exports = router;