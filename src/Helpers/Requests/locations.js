import axios from 'axios';

const locationRequests = {
  getSuggestions: async (input, sessionToken) => {
    return await axios.get('/suggestions/search', {
      params: {
        'searchText': input,
        'sessionToken': sessionToken,
      }
    })
      .then(response => {
        console.log('These are the suggestions: ', response.data);

        const localizedSuggestions = response.data.filter((location) => !!location.context.region);
        console.log('These are the localizedSuggestions: ', localizedSuggestions);
        return localizedSuggestions;
      })
      .catch(err => {
        throw err;
      });
  },
}

export default locationRequests;