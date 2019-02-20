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

export function fetchCommentsRequest(commentableID, path) {
	return {
		type: FETCH_COMMENTS_REQUEST,
		payload: {
			message: `requesting comments for ${path} with id: ${commentableID}`,
		},
	};
}

export function fetchCommentsSuccess(data, commentableID, path) {
	return {
		type: FETCH_COMMENTS_SUCCESS,
		data,
		payload: {
			message: `recieved comments for ${path} with id: ${commentableID}`,
		},
	};
}

export function fetchCommentsFailure(error, commentableID, path) {
	return {
		type: FETCH_COMMENTS_FAILURE,
		error,
		payload: { 
			apiRequest: {
				isFetching: false, 
				message: `Error getting comments for ${path} with id: ${commentableID} \n ${error}`,
				status: 'error' },
		},
	};
}

// `commentableID` maps to commentable_id and `commentableType` to `classses` or `movies` paths
export function getComments(commentableID, path) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest(commentableID, path));
		// return the axios promise with the data/status
		return axios.get(`/api/${path}/${commentableID}/comments`)
			// normalize the response data
			.then(resp => normalize(resp.data, commentsSchema))
			// inspect the normalized data
			.then((data) => {
				console.log('--comments-->', data);
				return data;
			})
			.then(data => dispatch(fetchCommentsSuccess(data, commentableID, path)))
			.catch((err) => {
				dispatch(fetchCommentsFailure(err, commentableID, path));
				console.log('---getComments--->', err);
			});
	};
}
