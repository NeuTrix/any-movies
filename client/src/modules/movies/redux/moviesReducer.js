// reducer for movies actions
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
	UPDATE_CURRENT_MOVIE,
	// CHECK_MOVIE_REGISTRATION // See if its registered in the api
} from './moviesConstants';

export const initialState = {
	currMovie: {
		Title: 'Alien',
		imdbID: 'tt0078748',
	},
	isFavourited: false, // change name to isMovieFavourited...
	isMovieRegistered: false,
	apiRequest: {
		isFetching: false,
		message: '',
		status: '',
	},
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
		return Object.assign({}, state, payload);

	case UPDATE_CURRENT_MOVIE:
		return Object.assign({}, state, payload);

	default:
		return state;
	}
}
