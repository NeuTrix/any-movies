// OMDB Api connection
// utilize CRA's Env variables (start with 'REACT_APP')
export const apiKey = process.env.REACT_APP_OMBD_MOVIE_API_KEY;
export const omdb_url = `http://www.omdbapi.com/?apikey=${apiKey}`;
