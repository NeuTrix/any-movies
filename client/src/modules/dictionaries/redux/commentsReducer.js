// // reducer for comments actions
// import {
// 	FETCH_COMMENTS_FAILURE,
// 	FETCH_COMMENTS_REQUEST,
// 	FETCH_COMMENTS_SUCCESS,
// 	UPDATE_CURRENT_COMMENTS,
// } from './commentsConstants';

// export const initialState = {
// 	dictionary: {}, // a lookup object of all comments by id/key
// 	commentableComments: [], // array of comment ids for the current commentable
// 	isFavourited: false, // change name to isMovieFavourited...
// 	apiRequest: {
// 		isFetching: false,
// 		message: '',
// 		status: '',
// 	},
// 	showCommentsForm: false,
// };

// export default function commentsReducer(state = initialState, action = {}) {
// 	// deconstruct the action item
// 	const { type, payload } = action;

// 	switch (type) {
// 	// request to the OMBD api
//   case FETCH_COMMENTS_REQUEST:
// 		// return Object.assign({}, state, payload.api);
// 		return { 
// 			...state, 
// 			// ...{ 
// 			// 	apiRequest: { 
// 			// 		isFetching: true,
// 			// 		message: 'Requesting comments',
// 			// 		status: 'requesting',
// 			// 	},
// 			// }
// 		}

// 	case FETCH_COMMENTS_FAILURE:
// 		return Object.assign({}, state, payload);

// 	case FETCH_COMMENTS_SUCCESS:
// 		const updatedDictionary = { ...state.dictionary, ...payload.dictionary }
// 		// return { ...state, ...{ dictionary: updatedDictionary} }

// 		return {
// 			...state,
// 			...{
// 				dictionary: updatedDictionary,
// 				commentableComments: payload.commentableComments,
// 				apiRequest: {
// 					isFetching: false,
// 					message: 'Successfully recieved comments',
// 					status: 'success',
// 				},
// 			}
// 		}

// 	case UPDATE_CURRENT_COMMENTS:
//     return Object.assign({}, state, payload);

// 	default:
// 		return state;
// 	}
// }
