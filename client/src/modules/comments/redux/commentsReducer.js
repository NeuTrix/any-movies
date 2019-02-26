// reducer for comments actions with a sub reducer for dictionary
import {
	ADD_COMMENTS_TO_DICTIONARY,
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	SET_COMMENTABLE,
} from '../../helpers/constants';

import { filterCommentsToArray } from '../../helpers';

// shape of comments state object
export const initialState = {
	// status of the api request
	apiStatus: { 
		isFetching: false,
		message: '',
		status: '',
	}, 
	comments: [],
	commentable: { id: '', type: ''}, // the Parent item of comment (id, type)
	current: {}, // the current comment in focus
	dictionary: {}, // a lookup object of all comments viewed in this session
	favourited: false, // favourited?
	indexes: [], // array of ids for the current commentable
	showForm: false, // showing new/edit form?
};

// reducer to handle nested dictionary state
export function dictionaryReducer(state = {}, action = {}) {
	const { type, payload } = action;

	switch (type) {
		case ADD_COMMENTS_TO_DICTIONARY:
			return {
				...state, 
				...payload.dictionary, // targeting the object dictionary
			}
		default: 
			return state;
	}
};

// ====> Primary reducer
export default function commentsReducer(state = initialState, action = {}) {
	const { type, payload } = action;
	
	switch (type) {
		// handle api failures
		case ADD_COMMENTS_TO_DICTIONARY:
		const { indexes, dictionary } = payload;
		console.log(9, '==>', 'in the add-comments-dict reducer');
		return {
			...state,
			...{
				// allow dictionary object ot accumulate objects vs
				// replacing the whole object state (due to nesting)
				dictionary: dictionaryReducer(state.dictionary, action),
				// indexes for the current commentable (movie or comment)
				indexes: indexes,
				comments: filterCommentsToArray(indexes, dictionary),
			},
		}

	case FETCH_COMMENTS_FAILURE:
		return {
			...state,
			...{
				comments: [], // reset and allows component to update
				apiStatus: {
					isFetching: false,
					message: `Error getting comments: \n ${payload.error}`,
					status: 'error'
				},
			},
		}

	case FETCH_COMMENTS_REQUEST:
		return { 
			...state, 
			...{ 
				apiStatus: { 
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
				apiStatus: {
					isFetching: false,
					message: 'Successfully recieved comments',
					status: 'success',
				},
			}
		}
		// handle COMMENTABLES OBJECT
		case SET_COMMENTABLE:
			const { commentableID, commentableType } = payload
			return {
				...state,
				...{
					commentable: { id: commentableID, type: commentableType }
				}
			}

	default:
		return state;
	}
}
