import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie'

import Cards from './Components/Cards/Cards.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';

//TODO: Add remove option on card to get rid of location
function App() {
  //locations will be an array of objects each from the Open Box API's suggested locations
  //these locations will have a latitude, longitude, name and other info
  //lat and long will be sent to back end to store weather data for locations
  const [sessionKey, setSessionKey] = useState('');
  const [locations, setLocations] = useState([]);
  const [unitType, setUnitType] = useState('imperial'); 
  const [areaSelected, setAreaSelected] = useState('');

  //TODO: Add cookies for location data, on component mount load them
  useEffect(() => {
    const cookies = new Cookies();
    const storedLocations = cookies.get('locations');
    const storedSessionKey = cookies.get('sessionKey');

    if (storedLocations && storedLocations.length > 0) {
      setLocations(storedLocations);
    }
    if (storedSessionKey) {
      setSessionKey(storedSessionKey);
    } else {
      const newSessionKey = uuidv4();
      const expirationDate = new Date();

      expirationDate.setTime(expirationDate.getTime() + (60*60*1000));

      setSessionKey(newSessionKey);
      cookies.set('sessionKey', newSessionKey, {expires: expirationDate});
    }
  }, [])

  //TODO: Update cookies when locations are added/removed
  useEffect(() => {
    //update cookie to new locations object
    const cookies = new Cookies();
    
    if (locations.length > 0) {
      cookies.set('locations', locations);
    } else {
      cookies.remove('locations');
    }
    
    //TODO: Maybe need to handle cookies when everything is done running
    //adding return statement handles unmounting
    return () => {
      //set cookies for final time before exiting application
      const updatedExpirationDate = new Date();

      updatedExpirationDate.setTime(updatedExpirationDate.getTime() + (60*60*1000));
      cookies.set('sessionKey', sessionKey, {expires: updatedExpirationDate});
    }
  }, [locations])

  const updateAreaSelected = (event) => {
    setAreaSelected(event.target.id);
  }
  const addLocation = (loc) => {
    const updatedLocations = locations.slice();
    
    updatedLocations.push(loc);
    setLocations(updatedLocations);
  }
  const removeLocation = (deletedLoc) => {
    const locationsCopy = locations.slice();
    console.log('deletedLoc: ', deletedLoc);
    const newLocations = locationsCopy.filter(loc => {
      console.log('Location: ', loc);
      console.log('boolean: ', !(loc.locale === deletedLoc.name && loc.region === deletedLoc.region));
      return !(loc.locale === deletedLoc.name && loc.region === deletedLoc.region);
    });

    console.log('new locations: ', newLocations);

    setLocations(newLocations);
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
      <Header addLocation={addLocation} toggleUnits={toggleUnitType} 
        handleAreaSelect={updateAreaSelected} areaSelected={areaSelected}
        sessionKey={sessionKey} />
      <Cards locations={locations} units={unitType}
        handleAreaSelect={updateAreaSelected} removeLocation={removeLocation} />
      <Footer handleAreaSelect={updateAreaSelected} />
    </div>
  )
}

export default App;