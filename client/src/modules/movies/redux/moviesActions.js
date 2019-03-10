
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
	// register
	REGISTER_MOVIE_FAILURE,
	REGISTER_MOVIE_REQUEST,
	REGISTER_MOVIE_SUCCESS,
	VALIDATE_MOVIE_REGISTRATION,
} from '../../helpers/constants';
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
			// VALIDATE registraion of current movie
			.then((resp) => {
				// console.log(989, '==>', resp.data.imdbID);
				dispatch(isMovieRegistered(resp.data.imdbID));
				return resp
			})
			// normalize the data
			.then(resp => normalize(resp.data, movie))
			// pass normalize data to the application
			.then((resp) => {
				const movieID = resp.result;
				const dictionary = resp.entities.movies;
				dispatch(fetchMovieSuccess(movieID, dictionary));
			})
			.catch((err) => {
				dispatch(fetchMovieFailure(err));
				console.log('--ERROR: #getMovieData-->', err);
			});
	};
}

// ===> register actions
export const registerMovieRequest = actionCreator(REGISTER_MOVIE_REQUEST);
// captures the error messages on fail
export const registerMovieFailure = actionCreator(REGISTER_MOVIE_FAILURE, 'error');
// logs success of api call and returns movie ID and detailed object/dictionary
export const registerMovieSuccess = actionCreator(
	REGISTER_MOVIE_SUCCESS,
	'movieID',
	'dictionary',
);

export const validateMovie = actionCreator(
	VALIDATE_MOVIE_REGISTRATION,
	'registered',
)

export function isMovieRegistered(imdbID) {
	return function thunk(dispatch) {
		return axios.get(`/api/movies/${imdbID}`)
		.then((resp) => {
			console.log(888, ' is movie regis==>', resp);
			dispatch(validateMovie(true))
		})
		.catch(err => {
			console.log(888, ' is NOT movie regis==>', err);
			dispatch(validateMovie(false))
			console.log(Error, '==>', err);
		})
	}
}

export function registerMovie(movie) {
	const { imdbID, title } = movie;
	const url = `/api/movies`;

	return function thunk(dispatch) {
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
				alert(`Added comment ${resp.data.id}: "${resp.data.title}"`);
				return resp
			})
			.catch((err) => {
				dispatch(registerMovieFailure(err));
				alert(`There was a problem adding your comment. \n ${err}`);
				console.log('ERROR=>', err);
			})
	};
}
