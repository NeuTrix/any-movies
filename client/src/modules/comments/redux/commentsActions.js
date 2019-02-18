import axios from 'axios';
import { omdbUrl } from '../../../helpers/api.helper';
import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
} from './commentsConstants';

export function fetchCommentsRequest(movieTitle) {
	return {
		type: FETCH_COMMENTS_REQUEST,
		payload: {
			requestToOmdbApi: { isFetching: true, status: 'requesting' },
		},
	};
}

export function fetchCommentsSuccess(data) {
	return {
		type: FETCH_COMMENTS_SUCCESS,
		payload: {
			currComments: data,
			requestToOmdbApi: { isFetching: false, status: 'success' },
		},
	};
}

export function fetchCommentsFailure(error) {
	return {
		type: FETCH_COMMENTS_FAILURE,
		payload: { 
			requestToOmdbApi: { isFetching: false, message: error, status: 'error' },
		},
	};
}

export function getComments(movieTitle) {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest(movieTitle));
		// return the axios promise with the data/status
		return axios.get(`${omdbUrl}&t=${movieTitle}`)
			.then(resp => resp.data)
			.then(data => dispatch(fetchCommentsSuccess(data)))
			.catch(err => dispatch(fetchCommentsFailure(err)));
	};
}
