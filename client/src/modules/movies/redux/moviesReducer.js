// reducer for movies actions
import {
  FETCH_MOVIE_FAILURE,
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  UPDATE_CURRENT_MOVIE,
} from './moviesConstants';

export default function moviesReducer(state = {}, action = {}) {
	// deconstruct the action item
  const { type, payload } = action;
  
	switch (type) {

    // request to the OMBD api
    case FETCH_MOVIE_REQUEST:
    console.log('==>',payload)
      return Object.assign({}, state, { 
        requestsToOMBD: { isFetching: true, status: payload.status }
      });

    case FETCH_MOVIE_SUCCESS:
      return Object.assign({}, state, { 
        requestsToOMBD: { success: true }
      });

    case UPDATE_CURRENT_MOVIE:
      // replace the entire current state object
      return Object.assign({}, state, { currMovie: payload });
      // return default payload in case args invalid or null
    default:
      return state;
	}
};
