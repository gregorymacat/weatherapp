import React, {useState} from 'react';

import CardHolder from './Components/CardHolder/CardHolder.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';

function App() {
  //locations will be an array of objects each from the Open Box API's suggested locations
  //these locations will have a latitude, longitude, name and other info
  //lat and long will be sent to back end to store weather data for locations
  
  const [locations, setLocations] = useState([]);
  //TODO: be able to change unit type to metric
  const [unitType, setUnitType] = useState('metric'); 

  const addLocation = (loc) => {
    const updatedLocations = locations.slice();
    
    updatedLocations.push(loc);
    setLocations(updatedLocations);
  }
  const toggleUnitType = () => {
    if (unitType === 'imperial') {
      setUnitType('metric')
    } else if (unitType === 'metric') {
      setUnitType('imperial');
    }
  }

  return (
    <div className="app-container">
      <Header addLocation={addLocation} toggleUnits={toggleUnitType}/>
      <CardHolder locations={locations} units={unitType}/>
      <Footer/>
    </div>
  )
}

export default App;