import React from 'react'
// url for local host connection
const url_local = `http://localhost:3001`;

// OMDB Api connection
// utilize CRA's Env variables (start with 'REACT_APP')
const apiKey = process.env.REACT_APP_OMBD_MOVIE_API_KEY

const url_Omdb_data = `http://www.omdbapi.com/?apikey=${apiKey}&`;
const url_Omdb_poster = `http://img.omdbapi.com/?apikey=${apiKey}&`;
