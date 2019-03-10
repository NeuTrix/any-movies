// reducer for comments actions with a sub reducer for dictionary
import {
	//  add
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	// delete
	DELETE_COMMENT_FAILURE,
	DELETE_COMMENT_REQUEST,
	DELETE_COMMENT_SUCCESS,
	// edit
	EDIT_COMMENT_FAILURE,
	EDIT_COMMENT_REQUEST,
	EDIT_COMMENT_SUCCESS,
	// get
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
	dictionary: {}, // a map of all comments viewed in this session
	favourited: false, // favourited?
};

// ====> Primary reducer
export default function commentsReducer(state = initialState, action = {}) {
	const { type, payload } = action;
	
	switch (type) {
// === DICTIONARY
		case UPDATE_DICTIONARY:
		return {
			...state,
			...{ dictionary: payload.dictionary },
		};

// === FAILURE
	case ADD_COMMENT_FAILURE:
	case DELETE_COMMENT_FAILURE:
	case EDIT_COMMENT_FAILURE:
	case GET_COMMENTS_FAILURE:
		return {
			...state,
			...{
				apiStatus: {
					isFetching: false,
					message: `Error getting comments: \n ${payload.error}`,
					status: 'error'
				},
			},
		};

// === REQUEST
	case ADD_COMMENT_REQUEST:
	case DELETE_COMMENT_REQUEST:
	case EDIT_COMMENT_REQUEST:
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

//  === SUCCESS
	case ADD_COMMENT_SUCCESS:
	case DELETE_COMMENT_SUCCESS:
	case EDIT_COMMENT_SUCCESS:
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
