import axios from 'axios';
import { omdbUrl } from '../../../helpers/api.helper';
import { nomralize, schema } from 'normalizr';

import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
} from './moviesConstants';

// normalizr schema
export const movie = new schema.Entity('movies', {}, { idAttribute: 'imdbID' }); // normalize data

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
			current: data,
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

// set the current movie
// export function setCurrentComment(commentableID) {
// 	return {
// 		type: SET_CURRENT_MOVIE,
// 		payload: {
// 			commentableID,
// 		},
// 	};
// }

export function getMovieData(movieTitle) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchMovieRequest(movieTitle));
		// return the axios promise with the data/status
		return axios.get(`${omdbUrl}&t=${movieTitle}`)
			.then(resp => resp.data)
			.then(data => dispatch(fetchMovieSuccess(data)))
			.catch((err) => {
				dispatch(fetchMovieFailure(err));
				console.log('--#getMovieData-->', err);
			});
	};
}
