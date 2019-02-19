import axios from 'axios';
import { normalize, schema } from 'normalizr';

import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
} from './commentsConstants';

// normalize data
const comments = new schema.Entity('comments');
const commentsSchema = ([comments]);

export function fetchCommentsRequest(comId, comPath) {
	return {
		type: FETCH_COMMENTS_REQUEST,
		payload: {
			requestToApi: {
				isFetching: true,
				message: `requesting comments for ${comPath} with id: ${comId}`,
				status: 'requesting',
			},
		},
	};
}

export function fetchCommentsSuccess(data, comId, comPath) {
	return {
		type: FETCH_COMMENTS_SUCCESS,
		payload: {
			data,
			requestToApi: {
				isFetching: false,
				message: `recieved comments for ${comPath} with id: ${comId}`,
				status: 'success',
			},
		},
	};
}

export function fetchCommentsFailure(error, comId, comPath) {
	return {
		type: FETCH_COMMENTS_FAILURE,
		payload: { 
			requestToApi: {
				isFetching: false, 
				message: `Error getting comments for ${comPath} with id: ${comId} \n ${error}`,
				status: 'error' },
		},
	};
}

// `comId` maps to commentable_id and `comPath` to `classses` or `movies` paths
export function getComments(comId, comPath) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest(comId, comPath));
		// return the axios promise with the data/status
		return axios.get(`/api/${comPath}/${comId}/comments`)
			// normalize the response data
			.then(resp => normalize(resp.data, commentsSchema))
			// inspect the normalized data
			.then((data) => {
				console.log('--comments-->', data);
				return data;
			})
			.then(data => dispatch(fetchCommentsSuccess(data, comId, comPath)))
			.catch((err) => {
				dispatch(fetchCommentsFailure(err, comId, comPath));
				console.log('---getComments--->', err);
			});
	};
}
