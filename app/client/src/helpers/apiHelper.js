import React from 'react'
// url for local host connection
export const url_local = `http://localhost:3001`;

// OMDB Api connection
// utilize CRA's Env variables (start with 'REACT_APP')
export const apiKey = process.env.REACT_APP_OMBD_MOVIE_API_KEY
export const url_data = `http://www.omdbapi.com/?apikey=${apiKey}`;