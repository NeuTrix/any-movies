import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { makeActionCreator } from '../../../helpers';

import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	SET_COMMENTABLE,
} from './commentsConstants';

// normalizr schema
export const comment = new schema.Entity('comments'); // normalize data
export const commentsListSchema = [comment]; // shorthand for schema.Array...

// update the api request property
export const fetchCommentsRequest = makeActionCreator(
	FETCH_COMMENTS_REQUEST,
);

// manage the data returned from comments GET call api
export const fetchCommentsSuccess = makeActionCreator(
	FETCH_COMMENTS_SUCCESS,
	'subComments', 
	'dictionary',
);

// captures the error messages on fail
export const fetchCommentsFailure = makeActionCreator(
	FETCH_COMMENTS_FAILURE, 
	'error',
);

 // set the current comment
export const setCommentable = makeActionCreator(
	SET_COMMENTABLE,
	'commentable',
);

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
			.then((data) => {
				// normalize the datat
				const normed = normalize(data, commentsListSchema);
				const subComments = normed.result; // an array of indices
				const dictionary = normed.entities.comments; // an object map
				dispatch(fetchCommentsSuccess(subComments, dictionary));
			})
			.then(() => commentableType === 'Comment'
				&& dispatch(setCommentable(commentableID)))
			.catch((error) => {
				dispatch(fetchCommentsFailure(error));
				console.log('---#getComments error--->', error);
			});
	};
}
