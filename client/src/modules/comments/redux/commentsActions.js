import axios from 'axios';
import { normalize, schema } from 'normalizr';

import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	SET_CURRENT_COMMENT,
} from './commentsConstants';

const comment = new schema.Entity('comments'); // normalize data
const commentsListSchema = [comment]; // shorthand for new schema.Array...

// update the api request property
export function fetchCommentsRequest() {
	return {
		type: FETCH_COMMENTS_REQUEST,
	};
}

// manage the data returned from comments GET call api
export function fetchCommentsSuccess(data) {
	const normed = normalize(data, commentsListSchema);
	return {
		type: FETCH_COMMENTS_SUCCESS,
		payload: {
			comments: normed.result, // an array of indices
			dictionary: normed.entities.comments, // an object map
		},
	};
}

// captures the error messages on fail
export function fetchCommentsFailure(error) {
	return {
		type: FETCH_COMMENTS_FAILURE,
		payload: { error },
	};
}

// set the current comment and commentable type/id
export function setCurrentComment(commentableID) {
	return {
		type: SET_CURRENT_COMMENT,
		payload: {
			commentableID,
		},
	};
}


// retrieve the comments object (array of objs) from the api
export function getComments(commentableID, commentableType) {
	const path = commentableType === 'Comment' ? 'comments' : 'movies';
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest());
		// return the axios promise with the data/status
		return axios.get(`/api/${path}/${commentableID}/comments`)
			// normalize the response data
			.then((resp) => {
				console.log('--#getComments data-->', resp.data);
				return resp.data;
			})
			.then(data => dispatch(fetchCommentsSuccess(data)))
			.then(() => 
				commentableType === 'Comment' 
				&& dispatch(setCurrentComment(commentableID)
			)
			.catch((err) => {
				dispatch(fetchCommentsFailure(err));
				console.log('---#getComments err--->', err);
			})
	};
}
