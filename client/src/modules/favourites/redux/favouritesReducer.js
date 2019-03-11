// reducer for comments actions with a sub reducer for dictionary
import {
	//  add
	ADD_FAVOURITE_FAILURE,
	ADD_FAVOURITE_REQUEST,
	ADD_FAVOURITE_SUCCESS,
	// delete
	DELETE_FAVOURITE_FAILURE,
	DELETE_FAVOURITE_REQUEST,
	DELETE_FAVOURITE_SUCCESS,
	// edit
	EDIT_FAVOURITE_FAILURE,
	EDIT_FAVOURITE_REQUEST,
	EDIT_FAVOURITE_SUCCESS,
	// get
	GET_FAVOURITES_FAILURE,
	GET_FAVOURITES_REQUEST,
	GET_FAVOURITES_SUCCESS,
	// other
	TOGGLE_FAVOURITES_BUTTON,
	UPDATE_FAVOURITES_DICTIONARY,
} from '../../helpers/constants';

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
	const {
		type,
		payload
	} = action;

	switch (type) {
		// === FAVOURITES
		case UPDATE_FAVOURITES_DICTIONARY:
			return {
				...state,
				...{
					dictionary: payload.dictionary
				},
			};

			// === FAILURE
		case ADD_FAVOURITE_FAILURE:
		case DELETE_FAVOURITE_FAILURE:
		case EDIT_FAVOURITE_FAILURE:
		case GET_FAVOURITES_FAILURE:
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
		case ADD_FAVOURITE_REQUEST:
		case DELETE_FAVOURITE_REQUEST:
		case EDIT_FAVOURITE_REQUEST:
		case GET_FAVOURITES_REQUEST:
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
		case ADD_FAVOURITE_SUCCESS:
		case DELETE_FAVOURITE_SUCCESS:
		case EDIT_FAVOURITE_SUCCESS:
		case GET_FAVOURITES_SUCCESS:
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
