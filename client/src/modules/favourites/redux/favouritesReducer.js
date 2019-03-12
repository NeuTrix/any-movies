// reducer for favourites actions with a sub reducer for dictionary
import {
	// isFavourited
	CHECK_IS_FAVOURITED_FAILURE,
	CHECK_IS_FAVOURITED_REQUEST,
	CHECK_IS_FAVOURITED_SUCCESS,
	UPDATE_IS_FAVOURITED_STATUS,
	
} from '../../helpers/constants';

// shape of favourites state object
export const initialState = {
	// status of the api request
	apiStatus: {
		isFetching: false,
		message: '',
		status: '',
	},
	dictionary: {}, // a map of all favourites viewed in this session
	favourited: false, // favourited?
};

// ====> Primary reducer
export default function favouritesReducer(state = initialState, action = {}) {
	const { type, payload } = action;

	switch (type) {
		// === FAVOURITES
		case UPDATE_IS_FAVOURITED_STATUS:
			return {
				...state,
				...{
					favourited: payload.status
				},
			};

		// // === FAILURE
		case CHECK_IS_FAVOURITED_FAILURE:
			return {
				...state,
				...{
					apiStatus: {
						isFetching: false,
						message: `Error getting favourites: \n ${payload.error}`,
						status: 'error'
					},
				},
			};

		// === REQUEST
		case CHECK_IS_FAVOURITED_REQUEST:
			return {
				...state,
				...{
					apiStatus: {
						isFetching: true,
						message: 'Requesting favourites',
						status: 'requesting',
					},
				},
			};

		// //  === SUCCESS
		case CHECK_IS_FAVOURITED_SUCCESS:
			return {
				...state,
				...{
					apiStatus: {
						isFetching: false,
						message: 'Successfully recieved favourites',
						status: 'success',
					},
				}
			};

		default:
			return state;
	};
}
