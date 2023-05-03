import React, {useState} from 'react';
import CardHolder from './Components/CardHolder/CardHolder.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';

function App() {
  const [locations, setLocations] = useState(['Houston, TX']);

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