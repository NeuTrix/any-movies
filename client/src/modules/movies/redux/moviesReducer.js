// reducer for movies actions
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
	UPDATE_CURRENT_MOVIE,
} from './moviesConstants';

const initialState = {
    currMovie: { },
    isFavourited: false, // change name to isMovieFavourited...
	  isMovieRegistered: false,
	  requestToOmdbApi: {
			isFetching: false,
	    status: 'pending',
	  },
};

export default function moviesReducer(state = initialState, action = {}) {
	// deconstruct the action item
	const { type, payload } = action;

	switch (type) {
	// request to the OMBD api
    case FETCH_MOVIE_REQUEST: {}
      return Object.assign({}, state, payload);

	case FETCH_MOVIE_FAILURE:
		return Object.assign({}, state, {
			requestToOmdbApi: { status: 'errored' },
		});

  case FETCH_MOVIE_SUCCESS:
		return Object.assign({}, state, payload);

	case UPDATE_CURRENT_MOVIE:
		// replace the entire current state object
		return Object.assign({}, state, { currMovie: payload });
		// return default payload in case args invalid or null
	default:
		return state;
	}
}
