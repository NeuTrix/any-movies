import axios from 'axios';
import { normalize, schema } from 'normalizr';

import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
} from './commentsConstants';

// normalize data
const comments = new schema.Entity('comments');
// const requests = new schema.Entity('requests');
const commentsSchema = ([comments]);

export function fetchCommentsRequest() {
	return {
		type: FETCH_COMMENTS_REQUEST,
		payload: {
			message: 'Requesting comments',
		},
	};
}

export function fetchCommentsSuccess(data) {
	return {
		type: FETCH_COMMENTS_SUCCESS,
		data,
		payload: {
			message: 'Successfully recieved comments',
		},
	};
}

export function fetchCommentsFailure(error) {
	return {
		type: FETCH_COMMENTS_FAILURE,
		error,
		payload: { 
			apiRequest: {
				isFetching: false,
				message: `Error getting comments: \n ${error}`,
				status: 'error'
			},
		},
	};
}

// `commentableID` maps to commentable_id and `commentableType` to `classses` or `movies` paths
export function getComments(commentableID, path) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest());
		// return the axios promise with the data/status
		return axios.get(`/api/${path}/${commentableID}/comments`)
			// normalize the response data
			.then(resp => normalize(resp.data, commentsSchema))
			// inspect the normalized data
			.then((data) => {
				console.log('--#getComments data-->', data);
				return data;
			})
			.then(data => dispatch(fetchCommentsSuccess(data)))
			.catch((err) => {
				dispatch(fetchCommentsFailure(err));
				console.log('---#getComments err--->', err);
			});
	};
}
