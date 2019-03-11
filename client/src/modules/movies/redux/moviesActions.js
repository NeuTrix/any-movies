
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
	// register
	REGISTER_MOVIE_FAILURE,
	REGISTER_MOVIE_NOT_NEEDED,
	REGISTER_MOVIE_REQUEST,
	REGISTER_MOVIE_SUCCESS,
	VALIDATE_MOVIE_REGISTRATION,
} from '../../helpers/constants';
import { actionCreator, omdbUrl } from '../../helpers';

// normalizr schema
export const movieSchema = new schema.Entity('movies', {}, { idAttribute: 'imdbID' });

// actions with actionCreator. Simplifies boilerplate
// track progress of api request to OMDB database
// ===> GET / FETCH
export const fetchMovieRequest = actionCreator(FETCH_MOVIE_REQUEST);
// captures the error messages on fail
export const fetchMovieFailure = actionCreator(FETCH_MOVIE_FAILURE, 'error');
// logs success of api call and returns movie ID and detailed object/dictionary
export const fetchMovieSuccess = actionCreator(
	FETCH_MOVIE_SUCCESS,
	'movieID',
	'dictionary',
);

export function getMovieData(movieTitle) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch, state) {
		// alert app of request action
		dispatch(fetchMovieRequest(movieTitle));
		// grab the movie from the OMDB database api
		return axios.get(`${omdbUrl}&t=${movieTitle}`)
			// normalize the OMDB data
			.then(resp => normalize(resp.data, movieSchema))
			// pass normalized data to the application state
			.then((norm) => {
				const movieID = norm.result;
				const dictionary = norm.entities.movies;
				// store the movie in the 'viewed' dictionary
				dispatch(fetchMovieSuccess(movieID, dictionary));
			})
			.catch((err) => {
				dispatch(fetchMovieFailure(err));
				console.log('--ERROR: #getMovieData-->', err);
			});
	};
}

// ===> REGISTRATION actions
export const registerMovieRequest = actionCreator(REGISTER_MOVIE_REQUEST);
// captures the error messages on fail
export const registerMovieFailure = actionCreator(REGISTER_MOVIE_FAILURE, 'error');
// logs success of api call and returns movie ID and detailed object/dictionary
export const registerMovieSuccess = actionCreator(
	REGISTER_MOVIE_SUCCESS,
	'movieID',
	'dictionary',
);
// Conclude no action needed for registraion
export const registerMovieNotNeeded = actionCreator(
	REGISTER_MOVIE_NOT_NEEDED,
)
// Determine whether the movie exist in the app db and set state boolean
export const validateMovie = actionCreator(
	VALIDATE_MOVIE_REGISTRATION,
	'registered',
)
// ==> async functions
// validate registration status
export function isMovieRegistered(imdbID) {
	return function thunk(dispatch) {
		return axios.get(`/api/movies/${imdbID}`)
		.then(resp => dispatch(validateMovie(true)))
		.catch(err => {
			dispatch(validateMovie(false))
			console.log(Error, '==>', err);
		})
	}
}
// add a movie to the app db
export function registerMovie(movie) {
	const { imdbID, title } = movie;
	const url = `/api/movies`;

	return function thunk(dispatch, getState) {
		// bypass if this movvie is already registered (from state)
		if (getState().movies.registered) {
			console.log(`${current.Title} is already registered`);
			return dispatch(registerMovieNotNeeded());
		}
		return axios.post(url, movie)
		.then(resp => { 
				dispatch(registerMovieRequest())
				return resp
			})
			.then((resp) => {
				if (resp.status) { dispatch(registerMovieSuccess()) }
				return resp
			})
			.then((resp) => {
				console.log(`#registerMovie id ${resp.data.id} success==>`, { resp });
				return resp
			})
			.catch((err) => {
				dispatch(registerMovieFailure(err));
				console.log('ERROR=>', err);
			})
	};
}
