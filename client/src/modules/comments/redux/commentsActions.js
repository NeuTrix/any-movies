import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { actionCreator } from '../../helpers';

import {
	DELETE_COMMENT,
	// get
	GET_COMMENTS_FAILURE,
	GET_COMMENTS_REQUEST,
	GET_COMMENTS_SUCCESS,
	//  add
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_TO_DICTIONARY,
	// delete
	DELETE_COMMENT_FAILURE,
	DELETE_COMMENT_REQUEST,
	DELETE_COMMENT_SUCCESS,

	UPDATE_DICTIONARY,
} from '../../helpers/constants';

// normalizr schema
export const comment = new schema.Entity('comments'); // normalize data
export const commentsListSchema = [comment]; // shorthand for schema.Array...

// ====> GET actions
// captures the error messages on fail
export const fetchCommentsFailure = actionCreator(
	GET_COMMENTS_FAILURE,
	'error',
);
// update the api request property
export const fetchCommentsRequest = actionCreator(
	GET_COMMENTS_REQUEST,
);
// manage the data returned from comments GET call api
export const fetchCommentsSuccess = actionCreator(
	GET_COMMENTS_SUCCESS,
);

export const updateDictionary = actionCreator(
	UPDATE_DICTIONARY,
	'indexes',
	'dictionary',
);

// retrieve the comments object (array of objs) from the api
// ??? change to 'fetchComments'?
export function getComments() {
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest());
		// return the axios promise with the data/status
		return axios.get(`/api/comments/`)
			// normalize the response data
			.then((resp) => {
				console.log('--#getComments data-->', resp.data);
				return resp.data ? resp.data : 'no data'
			})
			.then((data) => {
				// normalize the data
				const normed = normalize(data, commentsListSchema);
				const indexes = normed.result; // an array of indices
				const dictionary = normed.entities.comments; // an object map
				dispatch(updateDictionary(indexes, dictionary));
				return normed
			})
			// update the api success state
			.then(() => dispatch(fetchCommentsSuccess()))
			.catch((error) => {
				dispatch(fetchCommentsFailure(error));
				return console.log('---#getComments error--->', error);
			});
	};
}

// ====> ADD actions
// captures the error messages on fail
export const addCommentFailure = actionCreator(
	ADD_COMMENT_FAILURE,
	'error',
);
// update the api request property
export const addCommentRequest = actionCreator(
	ADD_COMMENT_REQUEST,
);
// manage the data returned from comments GET call api
export const addCommentSuccess = actionCreator(
	ADD_COMMENT_SUCCESS,
);

export const addCommentToDictionary = actionCreator(
	ADD_COMMENT_TO_DICTIONARY,
	'indexes',
	'dictionary',
);

export function addComment(data) {
	const { commentable_id, commentable_type } = data;
	const path = commentable_type === 'Comment' ? 'comments' : 'movies';
	const url = `/api/${path}/${commentable_id}/comments`;

	return function thunk(dispatch) {
		return axios.post(url, data)
		.then(resp => { 
				dispatch(addCommentRequest())	
				return resp
			})
			.then((resp) => {
				if (resp.status) { dispatch(addCommentSuccess()) }
				return resp
			})
			.then(resp => {
				// normalize the data
				const normed = normalize(resp.data, commentsListSchema);
				dispatch(addCommentToDictionary(normed.result, normed.entities.comments));
				return resp
			})
			.then((resp) => {
					console.log('#addComment success==>', {commentable_id, resp});
					alert(`Added comment ${resp.data.id} ${resp.data.title}`);
			})
			.catch((err) => {
				dispatch(addCommentFailure(err));
				alert(`There was a problem adding your comment. \n ${err}`);
				console.log('ERROR=>', err);
			})
	};
}

// ====> DELETE actions
// update the api request to delete a comment
// captures the error messages on fail
export const deleteCommentFailure = actionCreator(
	DELETE_COMMENT_FAILURE,
	'error',
);

export const deleteCommentRequest = actionCreator(
	DELETE_COMMENT_REQUEST,
);
// affirm success of delete action in api
export const deleteCommentSuccess = actionCreator(
	DELETE_COMMENT_SUCCESS,
);

export function deleteComment(commentID) {

	return function thunk(dispatch) {
		dispatch(deleteCommentRequest());

		return axios.delete(`api/comments/${commentID}`)
			.then(() => dispatch(deleteComment(commentID)))
			.then(() => dispatch(deleteCommentSuccess()))
			.catch(err => {
				dispatch(deleteCommentFailure(err));
				console.log('Error', '==>', err);
			})
	}
}
