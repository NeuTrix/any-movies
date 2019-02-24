// reducer for movies actions
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
	SET_CURRENT_MOVIE,
	// CHECK_MOVIE_REGISTRATION // See if its registered in the api
} from './moviesConstants';

export const initialState = {
	apiRequest: {
		isFetching: false,
		message: '',
		status: '',
	},
	current: 'tt0078748',
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
				...payload.dictionary, // targeting the object dictionary
			}
		default: 
			return state;
	}
}; 

export default function moviesReducer(state = initialState, action = {}) {
	// deconstruct the action item
	const { type, payload } = action;

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
		}

	case FETCH_MOVIE_FAILURE:
		return Object.assign({}, state, payload);

	case FETCH_MOVIE_SUCCESS:
		return {
			...state,
			...{
				// allow dictionary object ot accumulate objects vs
				// replacing the whole object state (due to nesting)
				current: payload.current,
				dictionary: dictionaryReducer(state.dictionary, action),
				// subComments for the current commentable (movie or comment)
				apiRequest: {
					isFetching: false,
					message: 'Successfully recieved comments',
					status: 'success',
				},
			}
		};

	case SET_CURRENT_MOVIE:
		return Object.assign({}, state, payload);

	default:
		return state;
	}
}
