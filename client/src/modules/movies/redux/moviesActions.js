import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
} from './moviesConstants';

import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { actionCreator, omdbUrl } from '../../helpers';

// normalizr schema
export const movie = new schema.Entity('movies', {}, { idAttribute: 'imdbID' });

export const fetchMovieRequest = actionCreator(FETCH_MOVIE_REQUEST)

export const fetchMovieSuccess = actionCreator(
	FETCH_MOVIE_SUCCESS, 
	'movieID', 
	'dictionary'
); 

// captures the error messages on fail
export const fetchMovieFailure = actionCreator(
	FETCH_MOVIE_FAILURE,
	'error',
);

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
			// normalize the data
			.then(resp => normalize(resp.data, movie))
			.then(data => {
				const movieID = data.result;
				const dictionary = data.entities.movies;
				console.log(1, '==>', movieID, dictionary);
				dispatch(fetchMovieSuccess(movieID, dictionary))
			})
			.catch((err) => {
				dispatch(fetchMovieFailure(err));
				console.log('--ERROR: #getMovieData-->', err);
			});
	};
}
