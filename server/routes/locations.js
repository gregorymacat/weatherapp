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
            placeFormatted: place_formatted,
          })
        })
      }
      
      res.status(200).send(modifiedSuggestions);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(400);
    })
});

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
          geometry,
          properties,
        } = response.data.features[0];

        console.log('Server side: ', response.data.features[0]);
        
        res.status(200).send({geometry, properties});
      }
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(400);
    })
});

module.exports = router;