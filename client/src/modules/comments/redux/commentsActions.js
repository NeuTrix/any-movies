import axios from 'axios';
import { omdbUrl } from '../../../helpers/api.helper';
import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
} from './commentsConstants';

export function fetchCommentsRequest() {
	return {
		type: FETCH_COMMENTS_REQUEST,
		payload: {
			requestToApi: { isFetching: true, status: 'requesting' },
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

export function getComments(comment) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest(comment));
		// return the axios promise with the data/status
		return axios.get(`${omdbUrl}&t=${comment}`)
			.then(resp => resp.data)
			.then(data => console.log('--comments-->', data))
			.then(data => dispatch(fetchCommentsSuccess(data)))
			.catch(err => dispatch(fetchCommentsFailure(err)));
	};
}
