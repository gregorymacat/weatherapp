require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');



router.get('/search', (req, res) => {
  const { searchText, sessionToken } = req.query;
  const inDevelopment = process.env.APPLICATION_MODE === 'development';

  axios.get('https://api.mapbox.com/search/searchbox/v1/suggest', {
    params: {
      'q': searchText,
      types: 'country,city,place,postcode,region',
      'access_token': process.env.SEARCHBOX_KEY,
      'session_token': inDevelopment ? process.env.SESSION_KEY : sessionToken,
    }
  })
    .then(response => {
      const modifiedSuggestions = [];

      if (response.data.suggestions) {
        response.data.suggestions.forEach(({
          context,
          name,
          name_preferred,
          mapbox_id,
          place_formatted,
        }) => {
          modifiedSuggestions.push({
            context,
            name,
            namePreferred: name_preferred,
            mapboxId: mapbox_id,
            place_formatted,
          })
        })
      }
      
      res.status(200).send(modifiedSuggestions);
    })
    .catch(err => {
      console.error('Error making suggest request to SearchBox API: ', err);
      res.sendStatus(400);
    })
});

/*
  Retrieves location data from suggestion object selected using mapbox API. 
  @param {object} req - Request object needs to have mapbox ID (id) and user's session token
  (sessionToken) in its parameters
  @returns {object}
    name: Local name
    place_formatted: Local name + region name, country name
    context: country information, region information, district information
    coordinates: latitude, longitude
*/
router.get('/retrieve', (req, res) => {
  const { id, sessionToken } = req.query;
  console.log('This is the mapbox ID: ', id);
  const inDevelopment = process.env.APPLICATION_MODE === 'development';

  axios.get(`https://api.mapbox.com/search/searchbox/v1/retrieve/${id}`, {
    params: {
      'access_token': process.env.SEARCHBOX_KEY,
      'session_token': inDevelopment ? process.env.SESSION_KEY : sessionToken,
    }
  })
    .then(response => {
      if (response.data.features) {
        const {
          name,
          place_formatted,
          context,
          coordinates,
        } = response.data.features[0].properties;
        console.log('Server side retrieve object: ', response.data.features[0]);
        
        res.status(200).send({
          name,
          place_formatted,
          context,
          coordinates,
        });
      }
    })
    .catch(err => {
      console.error('Error making retrieve request to SearchBox API: ', err);
      res.sendStatus(400);
    })
});

module.exports = router;