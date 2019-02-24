// reducer for movies actions
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
	SET_CURRENT_MOVIE,
	// CHECK_MOVIE_REGISTRATION // See if its registered in the api
} from '../../helpers/constants';
import { createRef } from 'react';

export const initialState = {
	apiRequest: {
		isFetching: false,
		message: '',
		status: '',
	},
	current: {},
	imdbID: '',
	title: '',
	poster: '',
	dictionary: {},
	favourited: false, // change name to isMovieFavourited...
	registered: false,
};

//  reducer to handle nested dictionary state
export function dictionaryReducer(state = {}, action = {}) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_MOVIE_SUCCESS:
			return {
				...state, 
				...payload.dictionary, // add the movie details object
			}
		default: 
			return state;
	}
}; 

export default function moviesReducer(state = initialState, action = {}) {
	const { type, payload } = action; // deconstruct the action item

	switch (type) {
	// request to the OMBD api
		case FETCH_MOVIE_REQUEST:
			return { 
				...state, 
				...{ 
					apiRequest: { 
						isFetching: true,
						message: 'Requesting movie',
						status: 'requesting',
					},
				}
			};
		
		// hydrate the application with movie data
		case FETCH_MOVIE_SUCCESS:
			const { dictionary, movieID } = payload
			const movie = dictionary[movieID]
			return {
				...state,
				...{
					imdbID: movie.imdbID,
					current: movie,
					title: movie.Title,
					poster: movie.Poster,
					// allow dictionary object ot accumulate/ cache movie search objects 
					dictionary: dictionaryReducer(state.dictionary, action),
					apiRequest: {
						isFetching: false,
						message: 'Successfully recieved comments',
						status: 'success',
					},
				}
			};
			
		// log failures
		case FETCH_MOVIE_FAILURE:
			const { error } = payload
			return {
				...state,
				...{
					apiRequest: {
						isFetching: false,
						message: `Error getting movie: \n ${error}`,
						status: 'error'
					},
				},
			};

		default:
			return state;
	}
}
