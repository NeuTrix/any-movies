// reducer for comments actions
import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	UPDATE_CURRENT_COMMENTS,
} from './commentsConstants';

// shape of comments state object
export const initialState = {
	apiRequest: { 
		isFetching: false,
		message: '',
		status: '',
	}, // status of the api request
	comments: [], // array of comment ids for the current comment
	current: {}, // the current comment (in focus)
	dictionary: {}, // a lookup object of all comments by id/key
	isFavourited: false, // favourited?
	showForm: false, // showing new/edit form ?
};

// reducer to handle nested dictionary state
export function dictionaryReducer( state = {}, action = {}) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_COMMENTS_SUCCESS:
			return {
				...state, 
				...payload.dictionary 
			}
		default: 
			return state;
	}
};
 
export default function commentsReducer(state = initialState, action = {}) {
	const { type, payload } = action;

	switch (type) {
	// request to the OMBD api
  case FETCH_COMMENTS_REQUEST:
		return { 
			...state, 
			...{ 
				apiRequest: { 
					isFetching: true,
					message: 'Requesting comments',
					status: 'requesting',
				},
			}
		}

	case FETCH_COMMENTS_FAILURE:
		return Object.assign({}, state, payload);

	case FETCH_COMMENTS_SUCCESS:
		return {
			...state,
			...{
				dictionary: dictionaryReducer(state.dictionary, action),
				comments: payload.comments,
				apiRequest: {
					isFetching: false,
					message: 'Successfully recieved comments',
					status: 'success',
				},
			}
		}

	case UPDATE_CURRENT_COMMENTS:
    return Object.assign({}, state, payload);

	default:
		return state;
	}
}
