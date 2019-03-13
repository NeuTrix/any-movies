import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { actionCreator } from '../../helpers';
import { registerMovie } from '../../movies/redux/moviesActions';

import {
	ADD_FAVOURITE_FAILURE,
	ADD_FAVOURITE_REQUEST,
	ADD_FAVOURITE_SUCCESS,
	
	// check status
	CHECK_IS_FAVOURITED_FAILURE,
	CHECK_IS_FAVOURITED_REQUEST,
	CHECK_IS_FAVOURITED_SUCCESS,
	
	DELETE_FAVOURITE_FAILURE,
	DELETE_FAVOURITE_REQUEST,
	DELETE_FAVOURITE_SUCCESS,

	// retrieve the user's list of favourite movies
	GET_FAVOURITES_FAILURE,
	GET_FAVOURITES_REQUEST,
	GET_FAVOURITES_SUCCESS,
	
	TOGGLED_FAVOURITED_STATUS,
	UPDATE_IS_FAVOURITED_STATUS,
	UPDATE_FAVOURITES_DICTIONARY,
} from '../../helpers/constants';

// ============ CHECK Favourites
// captures the error messages on fail
export const checkIsFavouritedFailure = actionCreator(
	CHECK_IS_FAVOURITED_FAILURE,
	'error',
);
// update the api request property
export const checkIsFavouritedRequest = actionCreator(
	CHECK_IS_FAVOURITED_REQUEST,
);
// manage the data returned from favourites GET call api
export const checkIsFavouritedSuccess = actionCreator(
	CHECK_IS_FAVOURITED_SUCCESS,
);

export const updateIsFavouritedStatus = actionCreator(
	UPDATE_IS_FAVOURITED_STATUS,
	'current', // favourite_id of the current movie
	'status', // determine if this movie is favourited
);
// returns a boolean value re presence of favourite for this user
export function isFavourited({ movieID, userID }) {

	return function thunk(dispatch) {

		return axios.get(`/api/users/${userID}/favourites?filter=${movieID}`)
			.then(resp => {
				dispatch(checkIsFavouritedRequest());
				return resp;
			})
			.then((resp) => {
				const data = resp.data;
				if (data) {
					const status = data[0] && data[0].favourited_id === movieID || false;
					const current = status && data[0].id || 'null';
					dispatch(updateIsFavouritedStatus(current, status));
				}
			})
			.then(() => dispatch(checkIsFavouritedSuccess()))
			.catch(err => { 
				dispatchEvent(checkIsFavouritedFailure(err));
				console.log(err);
			})
	} 
}

// ============ TOGGLE Favourites
export const toggledFavouritedStatus = actionCreator(
	TOGGLED_FAVOURITED_STATUS,
	'current', // favourite id
	'status', // current movie id
);

export const addFavouriteFailure = actionCreator(
	ADD_FAVOURITE_FAILURE,
	'error',
);

export const addFavouriteRequest = actionCreator(
	ADD_FAVOURITE_REQUEST
);

export const addFavouriteSuccess = actionCreator(
	ADD_FAVOURITE_SUCCESS
);

export const deleteFavouriteFailure = actionCreator(
	DELETE_FAVOURITE_FAILURE,
	'error',
);

export const deleteFavouriteRequest = actionCreator(
	DELETE_FAVOURITE_REQUEST
);

export const deleteFavouriteSuccess = actionCreator(
	DELETE_FAVOURITE_SUCCESS
);
// pass in an args 'data' object
export function toggleFavourited({ favID, movie, status, userID }) {

	return function thunk(dispatch) {

		if (status) {
			dispatch(deleteFavouriteRequest());

			return axios.delete(`/api/favourites/${favID}`)
				.then(() => dispatch(toggledFavouritedStatus('null', false)))
				.then(() => dispatch(deleteFavouriteSuccess()))
				.then(() => dispatch(getUsersFavourites(userID)))
				.catch((err) => dispatch(deleteFavouriteFailure(err)))
		} else {
			dispatch(addFavouriteRequest())
			const data = { 
				favourited_id: movie.imdbID, 
				favourited_type: 'Movie',
				poster: movie.Poster,
			}
			
			return axios.post(`/api/users/${userID}/favourites/`, data)
				.then((resp) => dispatch(toggledFavouritedStatus(resp.data.id, true)))
				.then(() => dispatch(addFavouriteSuccess()))
				.then(() => dispatch(getUsersFavourites(userID)))
				.catch((err) => dispatch(addFavouriteFailure(err)))
		}
	}
}

// ============ GET Favourites
// normalizr schema
export const favourite = new schema.Entity('favourites'); // normalize data
export const favouritesListSchema = [favourite]; // shorthand -> schema.Array...

export const getFavouritesFailure = actionCreator(
	GET_FAVOURITES_FAILURE,
	'error',
);

export const getFavouritesRequest = actionCreator(
	GET_FAVOURITES_REQUEST
);

export const getFavouritesSuccess = actionCreator(
	GET_FAVOURITES_SUCCESS
);

export const updateFavouritesDictionary = actionCreator(
	UPDATE_FAVOURITES_DICTIONARY,
	'indexes',
	'dictionary',
);
export function getUsersFavourites(userID) {

	return function thunk(dispatch) {

		return axios.get(`/api/users/${userID}/favourites`)
			.then((resp) => {
				const data = resp.data;
				// normalize the data
				const normed = normalize(data, favouritesListSchema);
				const indexes = normed.result; // an array of indices
				const dictionary = normed.entities.favourites; // an object map
				dispatch(updateFavouritesDictionary(indexes, dictionary));
				return normed
			})
			.catch(err => console.log(err))
	}
}


