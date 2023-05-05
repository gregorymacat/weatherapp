import React, {useState} from 'react';
import './Header.css';

/*
  Search functionality:
  Takes user input and sends it as the request to Search Box /suggest endpoint
  Display suggestions from response beneath the search bar as potential locations
  Need to keep track of mapbox_id

*/

function Header({addLocation}) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    const userInput = event.target.value;

    //make get request to /suggest
    //https://api.mapbox.com/search/searchbox/v1/suggest?q={search_text}&types=country,city,place,postcode,region
    //search_text will be the user input

    //won't need setInput anymore
    //need to store the suggestions in state instead though

    //need to add component/html for displaying suggestions beneath input bar 

    setInput(userInput);
  }

  //might need to be a component instead
  const displaySuggestions = () => {
    //using suggestions from state
    //need to display a clickable box for each suggestion beneath input bar
    //each clickable box should show the city, (state if available), zip code, country

    //when user clicks on a box call handleClick from Header component
    //pass the suggestion object of the corresponding box to handleClick
  }

  const chooseSuggestion = (suggestionId) => {
    //chooseSuggestion function should be in header and passed down to suggestion component
    //chooseSuggestion function will make a get request to /retrieve
    //https://api.mapbox.com/search/searchbox/v1/retrieve/{id}
    //id will be from the suggestion object, mapbox_id
        
    //fill location information from that retrieve object into the input box
    //city, (state) zip, country
  }

  const handleSubmit = (event) => {
    const isValid = validateLocation(input);
    //won't need validation here anymore
    //

    if (isValid) {
      addLocation(input);
    } else {
      //display error above input bar explaining how to use app
    }
    event.preventDefault();
  }

  const validateLocation = (loc) => {
    

    return true;
  }

  return (
    <section id="header">
      <h1>Weather</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="City, State (or Country)" onChange={handleChange}></input>
      </form>
    </section>
  )
}

export default Header;