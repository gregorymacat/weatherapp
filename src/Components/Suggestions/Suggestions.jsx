import React from 'react';

function Suggestions({locationSuggestions, chooseSuggestion}) {
  //using suggestions from props
  //need to display a clickable box for each suggestion beneath input bar
  //each clickable box should show the city, (state if available), zip code, country

  //when user clicks on a box call handleClick from props
  //pass the suggestion object of the corresponding box to handleClick

  const handleClick = (event) => {
    const suggestionIndex = event.target.id;
    console.log('Index chosen: ', suggestionIndex);
    const {mapboxId} = locationSuggestions[suggestionIndex];

    chooseSuggestion(mapboxId);
  }
  return (
    <ul className="suggestions">
      {
        locationSuggestions.map((location, idx) => {
          console.log('This is a location: ', location);
          return (
            <li id={`${location.name}-${idx}`} onClick={handleClick}>
              {location.name}, {location.context.region.region_code}
            </li>
          )
        })
      }
    </ul>
  )
}

export default Suggestions;