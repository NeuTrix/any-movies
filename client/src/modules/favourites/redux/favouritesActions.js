import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { actionCreator } from '../../helpers';
import { registerMovie } from '../../movies/redux/moviesActions';

import {
	// check status
	CHECK_IS_FAVOURITED_FAILURE,
	CHECK_IS_FAVOURITED_REQUEST,
	CHECK_IS_FAVOURITED_SUCCESS,
	UPDATE_IS_FAVOURITED_STATUS,
	// update
	// UPDATE_FAVOURITES_FAILURE,
	// UPDATE_FAVOURITES_REQUEST,
	// UPDATE_FAVOURITES_SUCCESS,
	// UPDATE_FAVOURITES_DICTIONARY,
	// TOGGLE_FAVOURITE,
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
	'status',
);

export function isFavourited(userID,movieID) {

	return function thunk(dispatch, prevState) {

		return axios.get(`/api/users/${userID}/favourites?filter=${movieID}`)
		.then((resp) => {
			console.log(1000, '==>', resp);
		})
		.catch(err => { console.log(err)})
	} 
}

// // ====> GET actions
// // captures the error messages on fail
// export const updateFavouritesFailure = actionCreator(
// 	UPDATE_FAVOURITES_FAILURE,
// 	'error',
// );
// // update the api request property
// export const updateFavouritesRequest = actionCreator(
// 	UPDATE_FAVOURITES_REQUEST,
// );
// // manage the data returned from favourites GET call api
// export const updateFavouritesSuccess = actionCreator(
// 	UPDATE_FAVOURITES_SUCCESS,
// );

// export const updateFavouritesDictionary = actionCreator(
// 	UPDATE_FAVOURITES_DICTIONARY,
// 	'indexes',
// 	'dictionary',
// );

// // retrieve the favourites object (array of objs) from the api
// export function updateFavourites() {
// 	// using thunk middleware to return a fn from an action
// 	// named it `thunk` to clear linting err re:anonymous fucntions
// 	return function thunk(dispatch) {
// 		// alert state of request action
// 		dispatch(updateFavouritesRequest());
// 		// return the axios promise with the data/status
// 		return axios.get(`/api/favourites/`)
// 			// normalize the response data
// 			.then((resp) => {
// 				console.log('--#updateFavourites data-->', resp.data);
// 				return resp.data ? resp.data : 'no data'
// 			})
// 			.then((data) => {
// 				// normalize the data
// 				const normed = normalize(data, favouritesListSchema);
// 				const indexes = normed.result; // an array of indices
// 				const dictionary = normed.entities.favourites; // an object map
// 				dispatch(updateDictionary(indexes, dictionary));
// 				return normed
// 			})
// 			// dispatch to update the state of the dictionary
// 			.then(() => dispatch(updateFavouritesSuccess()))
// 			.catch((error) => {
// 				dispatch(updateFavouritesFailure(error));
// 				return console.log('---#updateFavourites error--->', error);
// 			});
// 	};
// }

// // ====> ADD actions
// export const toggleFavouriteFailure = actionCreator(
// 	TOGGLE_FAVOURITE_FAILURE,
// 	'error',
// );
// export const toggleFavouriteRequest = actionCreator(
// 	TOGGLE_FAVOURITE_REQUEST,
// );
// export const toggleFavouriteSuccess = actionCreator(
// 	TOGGLE_FAVOURITE_SUCCESS,
// );

// export function toggleFavourite(data) {
// 	const { commentable_id, commentable_type } = data;
// 	const path = commentable_type === 'Favourite' ? 'favourites' : 'movies';
// 	const url = `/api/${path}/${commentable_id}/favourites`;

// 	return function thunk(dispatch, state) {

// 		return axios.post(url, data)
// 		.then(resp => { 
// 				dispatch(toggleFavouriteRequest())	
// 				return resp
// 			})
// 			.then((resp) => {
// 				if (resp.status) { dispatch(toggleFavouriteSuccess()) }
// 				return resp
// 			})
// 			.then((resp) => {
// 				console.log(`#toggleFavourite id ${resp.data.id} success==>`, { resp });
// 				alert(`Added favourite ${resp.data.id}: "${resp.data.title}"`);
// 				return resp
// 			})
// 			.then((resp) => {
// 				dispatch(updateFavourites());
// 				return resp
// 			})
// 			.catch((err) => {
// 				dispatch(toggleFavouriteFailure(err));
// 				alert(`There was a problem adding your favourite. \n ${err}`);
// 				console.log('ERROR=>', err);
// 			})
// 	};
// }


// // ====================================

// // add a movie to a user's favourites
// export function toggleFavourite(data) {
// 	axios.post('/api/favourites', data)
// 		.then((resp) => {
//     	console.log('adding the favourite ==>', resp.data);
// 			return resp;
// 		})
// 		.catch((err) => {
// 			console.log('Err: #toggleFavourites ==>', err);
// 		});
// }

// // return an index of all favourites for this user
// export function updateFavourites(userId) {
// 	return axios.get(`api/users/${userId}/favourites`)
// 		.then((resp) => {
// 			console.log(`getting favourites for user: ${userId}:`, resp.data);
// 			return resp;
// 		})
// 		.catch((err) => {
// 			console.log('Err: #getFavouites', err);
// 		});
// }

// export function removeFavourite(data) {
// 	return axios.get('api/favourites', {
// 		params: {
// 			favourited_id: data.favourited_id,
// 			favourited_type: data.favourited_type,
// 			user_id: data.user_id,
// 		},
// 	})
// 		.then((resp) => {
// 			const favId = resp.data.id;
// 			console.log('removing favourite: ', favId);
// 			return axios.delete(`api/favourites/${favId}`);
// 		})
// 		.catch((err) => {
// 			console.log('Err: #removeFavourites ==>', err);
// 		});
// }

// // Returns a Promise to verify favuorited status for user/movie
// // data object has the favourite_id and boolean regarding exists?
// export function isFavourited(data) {
// 	return axios.get('api/favourites', {
// 		params: {
// 			favourited_id: data.favourited_id,
// 			favourited_type: data.favourited_type,
// 			user_id: data.user_id,
// 		},
// 	})
// 		.then((resp) => {
// 			if (resp.id !== 'null') {
// 				// console.log('current isFavourited status is:', resp.data);
// 				return resp;
// 			}
// 			// console.log(`Something's wrong with the data.\n See the logs.`);
// 			// console.log('data: ', data, 'resp.data: ', resp.data);
// 			return 'null response?';
// 		})
// 		.catch((err) => {
// 			console.log('Err: #isFavourited', err);
// 		});
// }
