// reducer for favourites actions with a sub reducer for dictionary
import {
	// isFavourited
	CHECK_IS_FAVOURITED_FAILURE,
	CHECK_IS_FAVOURITED_REQUEST,
	CHECK_IS_FAVOURITED_SUCCESS,
	TOGGLE_FAVOURITED_STATUS,
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
	current:'',
	dictionary: {}, // a map of all favourites viewed in this session
	status: false, // status?
};

// ====> Primary reducer
export default function favouritesReducer(state = initialState, action = {}) {
	const { type, payload } = action;

	switch (type) {
		// === FAVOURITES
		case TOGGLE_FAVOURITED_STATUS:
		case UPDATE_IS_FAVOURITED_STATUS:
			return {
				...state,
				...{
					current: payload.current,
					status: payload.status,
				},
			};

		// === FAILURE
		case CHECK_IS_FAVOURITED_FAILURE:
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
		case CHECK_IS_FAVOURITED_REQUEST:
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
		case CHECK_IS_FAVOURITED_SUCCESS:
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
