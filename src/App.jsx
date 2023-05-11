import React, {useState} from 'react';

import CardHolder from './Components/CardHolder/CardHolder.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';

function App() {
  //locations will be an array of objects each from the Open Box API's suggested locations
  //these locations will have a latitude, longitude, name and other info
  //lat and long will be sent to back end to store weather data for locations
  
  const [locations, setLocations] = useState([]);
  const [unitType, setUnitType] = useState('imperial'); //TODO: be able to change unit type

  const addLocation = (loc) => {
    const updatedLocations = locations.slice();
    
    updatedLocations.push(loc);
    console.log('This is updated locations: ', updatedLocations)

    setLocations(updatedLocations);
  }

  return (
    <div className="app-container">
      <Header addLocation={addLocation}/>
      <CardHolder locations={locations} units={unitType}/>
      <Footer/>
    </div>
  )
}

export default App;