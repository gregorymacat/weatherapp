import React, {useState} from 'react';
import './Header.css';

function Header({addLocation}) {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    const userInput = event.target.value;
    setInput(userInput);
  }

  const handleSubmit = (event) => {
    const isValid = validateLocation(input);
    if (isValid) {
      addLocation(input);
    } else {
      //display error above input bar explaining how to use app
    }
    event.preventDefault();
  }

  const validateLocation = (loc) => {
    //Do some stuff to validate that data can be found for the city
    //Probably string validation too
    //return true or false if valid or not
    return true;
  }

  return (
    <section id="header">
      <h1>Weather</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="City, State" onChange={handleChange}></input>
      </form>
    </section>
  )
}

export default Header;