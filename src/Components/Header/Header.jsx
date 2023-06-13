import React, {useEffect, useState} from 'react';
import axios from 'axios';

import locationRequests from '../../Helpers/Requests/locations';
import Suggestions from '../Suggestions/Suggestions.jsx';
import './Header.css';

/*
  Search functionality:
  Takes user input and sends it as the request to Search Box /suggest endpoint
  Display suggestions from response beneath the search bar as potential locations
  Need to keep track of mapbox_id

*/

function Header({addLocation, toggleUnits, areaSelected, handleAreaSelect, sessionKey}) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSearchError, setShowSearchError] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  //{locale: 'Houston', name: 'Houston Texas, United States', lat: 29.758938, lon: -95.367697}
  const [chosenLocation, setChosenLocation] = useState({});

  useEffect(() => {
    if (Object.keys(chosenLocation).length !== 0) {
      autofillInputField();
    }
  }, [chosenLocation]);

  useEffect(() => {
    checkShowSuggestions();
  }, [areaSelected]);

  const handleTextChange = async (event) => {
    const userInput = event.target.value;
    setInput(userInput);

    if (userInput === '') {
      setSuggestions([]);
    }
    try {
      const localizedSuggestions = await locationRequests.getSuggestions(userInput, sessionKey);
      if (localizedSuggestions.length > 0) {
        setSuggestions(localizedSuggestions);
      } else {
        setShowSearchError(true);
      }
    } catch (err) {
      console.error('Incomplete location suggestions request: ', err);
      setShowSearchError(true);
    }
  }

  const handleCheckboxChange = () => {
    toggleUnits();
  }

  const chooseSuggestion = (mapboxId) => {
    axios.get('/suggestions/retrieve', {
      params: {
        'id': mapboxId,
        'sessionToken': sessionKey,
      }
    })
      .then(response => {
        const locationData = response.data;
        const shortenedLocationName = locationData.name.length > 19
          ? `${locationData.name.substring(0, 17)}...`
          : locationData.name;

        const formattedLocation = {
          locale: shortenedLocationName,
          region: locationData.context.region.region_code,
          name: `${locationData.name}, ${locationData.place_formatted}`,
          lat: locationData.coordinates.latitude,
          lon: locationData.coordinates.longitude,
        }

        setShowSuggestions(false);
        setChosenLocation(formattedLocation);
        setShowSearchError(false);

        addLocation(formattedLocation);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const checkShowSuggestions = () => {
    if (areaSelected === 'search-location-input') {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const autofillInputField = () => {
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
      const localizedSuggestions = await locationRequests.getSuggestions(input, sessionKey);
      if (localizedSuggestions.length > 0) {
        setChosenLocation(localizedSuggestions[0]);
        if (showSearchError) setShowSearchError(false);
      } else {
        setShowSearchError(true);
      }
    }
    event.preventDefault();
  }

  const validateLocation = (loc) => {
    

    return true;
  }

  //need to place suggestions component beneath input element
  return (
    <section id="header" onClick={handleAreaSelect}>
      <div className="title-container">
        <h1>Weather</h1>
        <img src="titleicon.png"></img>
      </div>
      <div className="switch-container">
        <span id="imperial">Imperial</span>
        <label className="switch">
          <input type="checkbox" onChange={handleCheckboxChange}></input>
          <span className="slider round"></span>
        </label>
        <span id="metric">Metric</span>
      </div>
      <form id="search-location-container" onSubmit={handleSubmit} onClick={handleAreaSelect}>
        {
          showSearchError ? 
            <span>Please enter a valid location or choose from the options below</span> 
            : null
        }
        <input id="search-location-input" type="text" placeholder="City, State (or Country)" onChange={handleTextChange}></input>
        {
          showSuggestions ? 
            <Suggestions locationSuggestions={suggestions} chooseSuggestion={chooseSuggestion}/>
            : null
        }
      </form>
    </section>
  )
}

export default Header;