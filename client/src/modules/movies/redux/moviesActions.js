import axios from 'axios';
import { omdb_url } from '../../../helpers/api.helper';
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
		}
	}
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
			requestToOmdbApi: { isFetching: false, status: 'errored', message: error },
		},
	};
}

export function getMovie(movieTitle) {
	// using thunk middleware allows action to return a fn
	return function (dispatch) {
		// alert state of request action
		dispatch(fetchMovieRequest(movieTitle));

		// return the axios promise with the data/status
		return axios.get(`${omdb_url}&t=${movieTitle}`)
			.then(resp => {
				console.log(resp);
				return resp.data;
			})
			.then(data => {
				console.log('suc data', data)
				fetchMovieSuccess(data)})
			.catch(err => fetchMovieFailure(err));
	};
}
