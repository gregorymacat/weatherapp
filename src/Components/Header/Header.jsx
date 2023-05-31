import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import locationRequests from '../../Helpers/Requests/locations';
import Suggestions from '../Suggestions/Suggestions.jsx';
import './Header.css';

/*
  Search functionality:
  Takes user input and sends it as the request to Search Box /suggest endpoint
  Display suggestions from response beneath the search bar as potential locations
  Need to keep track of mapbox_id

*/
const sessionToken = uuidv4();

function Header({addLocation}) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSearchError, setShowSearchError] = useState(false);
  //{locale: 'Houston', name: 'Houston Texas, United States', lat: 29.758938, lon: -95.367697}
  const [chosenLocation, setChosenLocation] = useState({});

  useEffect(() => {
    autofillInputField();
  }, [chosenLocation])

  const handleChange = async (event) => {
    const userInput = event.target.value;
    setInput(userInput);

    try {
      const localizedSuggestions = await locationRequests.getSuggestions(userInput, sessionToken);
      console.log('Setting locations here: ', localizedSuggestions)
      if (localizedSuggestions.length > 0) {
        console.log('Setting locations here: ', localizedSuggestions)
        setSuggestions(localizedSuggestions);
      } else {
        console.log('Setting boolean to true')
        setShowSearchError(true);
      }
    } catch (err) {
      console.error('Incomplete location suggestions request: ', err);
      setShowSearchError(true);
    }
  }

  const chooseSuggestion = (mapboxId) => {
    //chooseSuggestion function should be in header and passed down to suggestion component
    //chooseSuggestion function will make a get request to /retrieve
    //https://api.mapbox.com/search/searchbox/v1/retrieve/{id}
    //id will be from the suggestion object, mapbox_id
    axios.get('/suggestions/retrieve', {
      params: {
        'id': mapboxId,
        'sessionToken': sessionToken,
      }
    })
      .then(response => {
        const locationData = response.data;
        console.log
        const formattedLocation = {
          locale: locationData.name,
          region: locationData.context.region.region_code,
          name: `${locationData.name}, ${locationData.place_formatted}`,
          lat: locationData.coordinates.latitude,
          lon: locationData.coordinates.longitude,
        }
        console.log('Retrieved location:\n', locationData);

        //fill location information from that retrieve object into the input box
        //city, (state) zip, country
        //example data returned in /weatherapp/exampleData/ json files in here

        //set location's longitude and latitude somewhere it can be used by weather card
        //to retrieve weather data for that location
        setChosenLocation(formattedLocation);
        if (showSearchError) setShowSearchError(false);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const autofillInputField = () => {
    //get input field with search-location-input ID
    //set its value to chosenLocation.placeFormatted
    //set input to the same value as well
    const searchInput = document.getElementById('search-location-input');
    searchInput.value = chosenLocation.name;
    setInput(chosenLocation.name);
  }

  const handleSubmit = async (event) => {
    //TODO: handle manually typed in locations
    //if user never selected a suggested location (aka no chosenLocation object in state)
      //need to get suggestion for and choose the first available one
      //if no suggestions are returned
        //need to prompt the user to enter a valid location, or choose from the options below

    //once a suggested object is available
    //call addLocation to send the suggestion object back to the App component

    if (Object.keys(chosenLocation).length !== 0) {
      addLocation(chosenLocation);
    } else {
      //display error above input bar explaining how to use app
      const localizedSuggestions = await locationRequests.getSuggestions(input, sessionToken);
      if (localizedSuggestions.length > 0) {
        setChosenLocation(localizedSuggestions[0]);
        if (showSearchError) setShowSearchError(false);
      } else {
        setShowSearchError(true);
      }
    }
  }

  const validateLocation = (loc) => {
    

    return true;
  }

  //need to place suggestions component beneath input element
  return (
    <section id="header">
      <div className="title-container">
        <h1>Weather</h1>
        <img src="titleicon.png"></img>
      </div>
      <form onSubmit={handleSubmit}>
        {
          showSearchError ? 
            <span>Please enter a valid location or choose from the options below</span> 
            : null
        }
        <input id="search-location-input" type="text" placeholder="City, State (or Country)" onChange={handleChange}></input>
        <Suggestions locationSuggestions={suggestions} chooseSuggestion={chooseSuggestion}/>
      </form>
    </section>
  )
}

export default Header;