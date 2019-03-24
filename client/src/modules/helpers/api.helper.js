// real
// OMDB Api connection
// utilize CRA's Env variables (start with 'REACT_APP')
export const apiKey = process.env.REACT_APP_OMBD_MOVIE_API_KEY;
export const omdbUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;
export const omdbPosterUrl = `https://img.omdbapi.com/?apikey=${apiKey}`;
