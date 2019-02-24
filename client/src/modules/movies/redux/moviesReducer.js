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

export default function moviesReducer(state = initialState, action = {}) {
	// deconstruct the action item
	const { type, payload } = action;

	switch (type) {
	// request to the OMBD api
	case FETCH_MOVIE_REQUEST:
		return Object.assign({}, state, payload);

	case FETCH_MOVIE_FAILURE:
		return Object.assign({}, state, payload);

	case FETCH_MOVIE_SUCCESS:
		return {
			...state,
			...{
				current: payload.current,
				dictionary: payload.dictionary,
			}
		};

	case SET_CURRENT_MOVIE:
		return Object.assign({}, state, payload);

	default:
		return state;
	}
}
