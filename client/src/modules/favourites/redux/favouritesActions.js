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
	
	TOGGLED_FAVOURITED_STATUS,
	UPDATE_IS_FAVOURITED_STATUS,
} from '../../helpers/constants';

// normalizr schema
export const favourite = new schema.Entity('favourites'); // normalize data
export const favouritesListSchema = [favourite]; // shorthand for schema.Array...

// ====> isFavourited actions
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

	return function thunk(dispatch, prevState) {

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
export function toggleFavourited({ favID, movieID, status, userID }) {

	return function thunk(dispatch) {

		if (status) {
			dispatch(deleteFavouriteRequest());

			return axios.delete(`/api/favourites/${favID}`)
				.then(() => dispatch(toggledFavouritedStatus('null2', false)))
				.then(() => dispatch(deleteFavouriteSuccess()))
				.catch((err) => dispatch(deleteFavouriteFailure(err)))
		} else {
			dispatch(addFavouriteRequest())
			const data = {favourited_id: movieID, favourited_type: 'Movie'}
			
			return axios.post(`/api/users/${userID}/favourites/`, data)
				.then((resp) => dispatch(toggledFavouritedStatus(resp.data.id, true)))
				.then(() => dispatch(addFavouriteSuccess()))
				.catch((err) => dispatch(addFavouriteFailure(err)))
		}
	}
}
