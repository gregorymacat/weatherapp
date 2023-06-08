import React, {useState, Suspense} from 'react';

import Cards from './Components/Cards/Cards.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';
import Loading from './Components/Loading/Loading.jsx';

function App() {
  //locations will be an array of objects each from the Open Box API's suggested locations
  //these locations will have a latitude, longitude, name and other info
  //lat and long will be sent to back end to store weather data for locations
  
  const [locations, setLocations] = useState([]);
  const [unitType, setUnitType] = useState('imperial'); 
  const [areaSelected, setAreaSelected] = useState('');

  const updateAreaSelected = (event) => {
    setAreaSelected(event.target.id);
  }
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
      <Header addLocation={addLocation} toggleUnits={toggleUnitType} handleAreaSelect={updateAreaSelected} areaSelected={areaSelected}/>
      <Cards locations={locations} units={unitType} handleAreaSelect={updateAreaSelected}/>
      <Footer handleAreaSelect={updateAreaSelected}/>
    </div>
  )
}

export default App;