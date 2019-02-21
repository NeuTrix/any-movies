// reducer for comments actions with a sub reducer for dictionary
import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
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
	favourited: false, // favourited?
	showForm: false, // showing new/edit form?
};

// reducer to handle nested dictionary state
export function dictionaryReducer(state = {}, action = {}) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_COMMENTS_SUCCESS:
			return {
				...state, 
				...payload.dictionary, // target the object dictionary
			}
		default: 
			return state;
	}
};
 
export default function commentsReducer(state = initialState, action = {}) {
	const { type, payload } = action;

	switch (type) {
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

	case FETCH_COMMENTS_SUCCESS:
		return {
			...state,
			...{
				// allow dictionary object ot accumulate objects vs
				// replacing the shole object state (due to nesting)
				dictionary: dictionaryReducer(state.dictionary, action),
				// comments for the current commentable (movie or comment)
				comments: payload.comments,
				apiRequest: {
					isFetching: false,
					message: 'Successfully recieved comments',
					status: 'success',
				},
			}
		}

	case FETCH_COMMENTS_FAILURE:
		return {
			...state,
			...{
				apiRequest: {
					isFetching: false,
					message: `Error getting comments: \n ${payload.error}`,
					status: 'error'
				},
			},
		}

	default:
		return state;
	}
}
