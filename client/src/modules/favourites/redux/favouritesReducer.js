// reducer for favourites actions with a sub reducer for dictionary
import {
	ADD_FAVOURITE_FAILURE,
	ADD_FAVOURITE_REQUEST,
	ADD_FAVOURITE_SUCCESS,

	CHECK_IS_FAVOURITED_FAILURE,
	CHECK_IS_FAVOURITED_REQUEST,
	CHECK_IS_FAVOURITED_SUCCESS,
	
	DELETE_FAVOURITE_FAILURE,
	DELETE_FAVOURITE_REQUEST,
	DELETE_FAVOURITE_SUCCESS,

	TOGGLED_FAVOURITED_STATUS,
	UPDATE_IS_FAVOURITED_STATUS,
    UPDATE_FAVOURITES_DICTIONARY,
} from '../../helpers/constants';

// shape of favourites state object
export const initialState = {
	// status of the api request
	apiStatus: {
		isFetching: false,
		message: '',
		status: '',
	},
	current:'',
	indexes: '', // array of favourites id's
	dictionary: {}, // a map of all favourites viewed in this session
	status: false, // status?
};

// ====> Primary reducer
export default function favouritesReducer(state = initialState, action = {}) {
	const { type, payload } = action;

	switch (type) {
		// === FAVOURITES
		case TOGGLED_FAVOURITED_STATUS:
		case UPDATE_IS_FAVOURITED_STATUS:
			return {
				...state,
				...{
					current: payload.current,
					status: payload.status,
				},
			}

		case UPDATE_FAVOURITES_DICTIONARY:
		return {
			...state,
			...{
				indexes: payload.indexes,
				dictionary: payload.dictionary,
			}
		}

		// === FAILURE
		case ADD_FAVOURITE_FAILURE:
		case CHECK_IS_FAVOURITED_FAILURE:
		case DELETE_FAVOURITE_FAILURE:
			return {
				...state,
				...{
					apiStatus: {
						isFetching: false,
						message: `Error getting status status: \n ${payload.error}`,
						status: 'error'
					},
				},
			};

		// === REQUEST
		case ADD_FAVOURITE_REQUEST:
		case CHECK_IS_FAVOURITED_REQUEST:
		case DELETE_FAVOURITE_REQUEST:
			return {
				...state,
				...{
					apiStatus: {
						isFetching: true,
						message: 'Requesting status status',
						status: 'requesting',
					},
				},
			};

		//  === SUCCESS
		case ADD_FAVOURITE_SUCCESS:
		case CHECK_IS_FAVOURITED_SUCCESS:
		case DELETE_FAVOURITE_SUCCESS:
			return {
				...state,
				...{
					apiStatus: {
						isFetching: false,
						message: 'Successfully checked status status',
						status: 'success',
					},
				}
			};

		default:
			return state;
	};
}
