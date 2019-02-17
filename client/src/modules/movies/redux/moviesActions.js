import { 
  FETCH_MOVIE_FAILURE,
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
} from './moviesConstants';

import axios from 'axios';


export function fetchMovieRequest(movieId) {
  return {
    type: FETCH_MOVIE_REQUEST,
    movieId,
    status: 'requested',
  }
}

export function fetchMovieSuccess(movieId, data) {
  return {
    type: FETCH_MOVIE_SUCCESS,
    payload: data,
    movieId,
    status: 'succeeded',
  }
}

export function fetchMovieFailure(movieId, error) {
  return {
    type: FETCH_MOVIE_FAILURE,
    payload: error,
    movieId,
    status: 'errored',
  }

}