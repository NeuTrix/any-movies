import axios from 'axios';

import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
} from './commentsConstants';

export function fetchCommentsRequest(commentableId, commentableType) {
	return {
		type: FETCH_COMMENTS_REQUEST,
		payload: {
			requestToApi: {
				isFetching: true,
				message: `getting comments for movie with id: ${commentableId}`,
				status: 'requesting',
			},
		},
	};
}

export function fetchCommentsSuccess(data) {
	return {
		type: FETCH_COMMENTS_SUCCESS,
		payload: {
			currComments: data,
			requestToApi: { isFetching: false, status: 'success' },
		},
	};
}

export function fetchCommentsFailure(error) {
	return {
		type: FETCH_COMMENTS_FAILURE,
		payload: { 
			requestToApi: { isFetching: false, message: error, status: 'error' },
		},
	};
}

// `comId` maps to commentable_id and `comPath` to `classses` or `movies` paths
export function getComments(comId, comPath) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest(comId));
		// return the axios promise with the data/status
		return axios.get(`/api/${comPath}/${comId}/comments`)
			.then(resp => resp.data)
			.then((data) => {
				console.log('--comments-->', data);
				return data;
			})
			.then(data => dispatch(fetchCommentsSuccess(data)))
			.catch((err) => {
				dispatch(fetchCommentsFailure(err));
				console.log('---getComments--->', err);
			});
	};
}
