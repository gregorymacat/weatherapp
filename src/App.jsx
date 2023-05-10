import React, {useState} from 'react';

import CardHolder from './Components/CardHolder/CardHolder.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';

function App() {
  //locations will be an array of objects each from the Open Box API's suggested locations
  //these locations will have a latitude, longitude, name and other info
  //lat and long will be sent to back end to store weather data for locations
  
  const [locations, setLocations] = useState(['Houston, TX']);

  //create weather object to store each location's weather data
  // {[city,state,country]: misc. weather data}

  //create function to retrieve weather data
  const retrieveWeatherData = () => {
    //call backend route for getting weather API data
    //http://localhost:3000/oneDayForecast?lat={suggested location's latitude}&long={suggested location's longitude}

    //set weather data for this location using name from the location object
  }

  const addLocation = (loc) => {
    const updatedLocations = locations.slice();
    
    updatedLocations.push(loc);
    setLocations(updatedLocations);
  }

  return (
    <div className="app-container">
      <Header addLocation={addLocation}/>
      <CardHolder locations={locations}/>
      <Footer/>
    </div>
  )
}

export default App;