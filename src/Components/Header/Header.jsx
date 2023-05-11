import React, {useState} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
  // const [chosenLocation, setChosenLocation] = useState({});
  const [chosenLocation, setChosenLocation] = useState({locale: 'Houston', name: 'Houston Texas, United States', lat: 29.758938, lon: -95.367697});

  const handleChange = (event) => {
    const userInput = event.target.value;
    
    axios.get('/suggestions/search', {
      params: {
        'searchText': userInput,
        'sessionToken': sessionToken,
      }
    })
      .then(response => {
        setSuggestions(response.data);
      })
      .catch(err => {
        console.error(err);
      });
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
        const formattedLocation = {
          locale: locationData.properties.name,
          name: `${locationData.properties.name} ${locationData.properties.place_formatted}`,
          lat: locationData.properties.coordinates.latitude,
          lon: locationData.properties.coordinates.longitude,
        }
        console.log('Retrieved location:\n', locationData);

        //fill location information from that retrieve object into the input box
        //city, (state) zip, country
        //example data returned in /weatherapp/exampleData/ json files in here

        //set location's longitude and latitude somewhere it can be used by weather card
        //to retrieve weather data for that location
        setInput(formattedLocation.name);
        setChosenLocation(formattedLocation);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const handleSubmit = (event) => {
    //if user never selected a suggested location (aka no suggestion object in state)
      //need to get suggestion for and choose the first available one
      //if no suggestions are returned
        //need to prompt the user to enter a valid location, or choose from the options below

    //once a suggested object is available
    //call addLocation to send the suggestion object back to the App component

    if (Object.keys(chosenLocation).length !== 0) {
      addLocation(chosenLocation);
    } else {
      //display error above input bar explaining how to use app
    }
    event.preventDefault();
  }

  const validateLocation = (loc) => {
    

    return true;
  }

  //need to place suggestions component beneath input element
  return (
    <section id="header">
      <h1>Weather</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="City, State (or Country)" onChange={handleChange}></input>
        <Suggestions locationSuggestions={suggestions} chooseSuggestion={chooseSuggestion}/>
      </form>
    </section>
  )
}

export default Header;