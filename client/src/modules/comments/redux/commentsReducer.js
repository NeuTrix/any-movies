// reducer for comments actions with a sub reducer for dictionary
import {
	ADD_COMMENT_TO_DICTIONARY,
	//  add
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	DELETE_COMMENT,

	GET_COMMENTS_FAILURE,
	GET_COMMENTS_REQUEST,
	GET_COMMENTS_SUCCESS,
	UPDATE_DICTIONARY,
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
	// indices:  // of all of dictionary objects
	dictionary: {}, // a lookup object of all comments viewed in this session
	favourited: false, // favourited?
};

// reducer to handle nested dictionary state
export function dictionaryReducer(state = {}, action = {}) {
	const { type, payload } = action;

	switch (type) {
		case ADD_COMMENT_TO_DICTIONARY:
		// case DELETE_COMMENT:
		case UPDATE_DICTIONARY:
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
		case ADD_COMMENT_TO_DICTIONARY:
		case UPDATE_DICTIONARY:
		// this causes scopiong issues- refactor
		return {
			...state,
			...{
				// allow dictionary object ot accumulate objects vs
				// replacing the whole object state (due to nesting)
				dictionary: dictionaryReducer(state.dictionary, action),
			},
		};

	// case DELETE_COMMENT:
	// return {
	// 	...state,
	// 	...{
	// 			dictionary: dictionaryReducer(state.dictionary, action),
	// 	}
	// }

	case ADD_COMMENT_FAILURE:
	case GET_COMMENTS_FAILURE:
		return {
			...state,
			...{
				movieComments: [], // reset and allows component to update
				apiStatus: {
					isFetching: false,
					message: `Error getting comments: \n ${payload.error}`,
					status: 'error'
				},
			},
		};

	case ADD_COMMENT_REQUEST:
	case GET_COMMENTS_REQUEST:
		return { 
			...state, 
			...{ 
				apiStatus: { 
					isFetching: true,
					message: 'Requesting comments',
					status: 'requesting',
				},
			},
		};

	case ADD_COMMENT_SUCCESS:
	case GET_COMMENTS_SUCCESS:
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
	
	default:
		return state;
	};
}
