import axios from 'axios';
import { omdbUrl } from '../../../helpers/api.helper';
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
} from './moviesConstants';

export function fetchMovieRequest(movieTitle) {
	return {
		type: FETCH_MOVIE_REQUEST,
		payload: {
			requestToOmdbApi: { isFetching: true, status: 'requesting' },
		},
	};
}

export function fetchMovieSuccess(data) {
	return {
		type: FETCH_MOVIE_SUCCESS,
		payload: {
			currMovie: data,
			requestToOmdbApi: { isFetching: false, status: 'success' },
		},
	};
}

export function fetchMovieFailure(error) {
	return {
		type: FETCH_MOVIE_FAILURE,
		payload: { 
			requestToOmdbApi: { isFetching: false, message: error, status: 'error' },
		},
	};
}

export function getMovie(movieTitle) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchMovieRequest(movieTitle));
		// return the axios promise with the data/status
		return axios.get(`${omdbUrl}&t=${movieTitle}`)
			.then(resp => resp.data)
			.then(data => dispatch(fetchMovieSuccess(data)))
			.catch(err => dispatch(fetchMovieFailure(err)));
	};
}
