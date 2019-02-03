// url for local host connection
export const url_local_api = `https://localhost:3001`;

// OMDB Api connection
// utilize CRA's Env variables (start with 'REACT_APP')
export const apiKey = process.env.REACT_APP_OMBD_MOVIE_API_KEY
export const url_movie_data = `https://www.omdbapi.com/?apikey=${apiKey}`;
