import axios from 'axios';

const locationRequests = {
  getSuggestions: async (input, sessionToken) => {
    await axios.get('/suggestions/search', {
      params: {
        'searchText': input,
        'sessionToken': sessionToken,
      }
    })
      .then(response => {
        const localizedSuggestions = response.data.filter((location) => !!location.context.region);
        return localizedSuggestions || [];
      })
      .catch(err => {
        throw err;
      });
  },
}

export default locationRequests;