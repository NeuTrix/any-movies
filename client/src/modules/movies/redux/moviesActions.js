
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
} from './moviesConstants';
import { actionCreator, omdbUrl } from '../../helpers';

// normalizr schema
export const movie = new schema.Entity('movies', {}, { idAttribute: 'imdbID' });

// ==> Build actions with actionCreator. Simplifies boilerplate
// track progress of api request to OMDB database
export const fetchMovieRequest = actionCreator(FETCH_MOVIE_REQUEST);
// captures the error messages on fail
export const fetchMovieFailure = actionCreator(FETCH_MOVIE_FAILURE, 'error');
// logs success of api call and returns movie ID and detailed object/dictionary
export const fetchMovieSuccess = actionCreator(
	FETCH_MOVIE_SUCCESS,
	'movieID',
	'dictionary',
);

// Redux thunk to facilitate async actions (not tested)
export function getMovieData(movieTitle) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert app of request action
		dispatch(fetchMovieRequest(movieTitle));
		// return the axios promise with the data/status
		return axios.get(`${omdbUrl}&t=${movieTitle}`)
			// normalize the data
			.then(resp => normalize(resp.data, movie))
			// pass normalize data to the application
			.then((data) => {
				const movieID = data.result;
				const dictionary = data.entities.movies;
				dispatch(fetchMovieSuccess(movieID, dictionary));
			})
			.catch((err) => {
				dispatch(fetchMovieFailure(err));
				console.log('--ERROR: #getMovieData-->', err);
			});
	};
}
