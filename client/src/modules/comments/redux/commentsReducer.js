// reducer for comments actions
import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	UPDATE_CURRENT_COMMENTS,
} from './commentsConstants';

export const initialState = {
	dictionary: [],
	commentable: [],
	isFavourited: false, // change name to isMovieFavourited...
	apiRequest: {
		isFetching: false,
		message: '',
		status: '',
	},
	showCommentsForm: false,
};

export default function commentsReducer(state = initialState, action = {}) {
	// deconstruct the action item
	const { type, payload } = action;

	switch (type) {
	// request to the OMBD api
  case FETCH_COMMENTS_REQUEST:
		// return Object.assign({}, state, payload.api);
		return { ...state, ...payload}

	case FETCH_COMMENTS_FAILURE:
		return Object.assign({}, state, payload);

  case FETCH_COMMENTS_SUCCESS:
		return Object.assign({}, state, payload.data.entities.comments);

	case UPDATE_CURRENT_COMMENTS:
    return Object.assign({}, state, payload);

	default:
		return state;
	}
}
