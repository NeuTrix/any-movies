import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { actionCreator } from '../../helpers';

import {
	ADD_COMMENT_TO_DICTIONARY,
	DELETE_COMMENT,
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	UPDATE_DICTIONARY,
} from '../../helpers/constants';

// update the api request property
export const fetchCommentsRequest = actionCreator(
	FETCH_COMMENTS_REQUEST,
);

// manage the data returned from comments GET call api
// need to factor out SET_COMMENTS from the success action
export const fetchCommentsSuccess = actionCreator(
	FETCH_COMMENTS_SUCCESS,
);

// captures the error messages on fail
export const fetchCommentsFailure = actionCreator(
	FETCH_COMMENTS_FAILURE, 
	'error',
);

	
export const addCommentToDictionary = actionCreator(
	ADD_COMMENT_TO_DICTIONARY,
	'indexes',
	'dictionary',
);

export const deleteComment = actionCreator(
	DELETE_COMMENT,
	'dictionary'
)
	
export const updateDictionary = actionCreator(
	UPDATE_DICTIONARY,
	'indexes',
	'dictionary',
);

// ===> ASYNC functions
// normalizr schema
export const comment = new schema.Entity('comments'); // normalize data
export const commentsListSchema = [comment]; // shorthand for schema.Array...

// data object is an array of objects `[{}]`
export function addComment( data ) {
	const { commentable_id, commentable_type } = data;
	const path = commentable_type === 'Comment' ? 'comments' : 'movies';
	const url = `/api/${path}/${commentable_id}/comments`;
	
	return function thunk(dispatch) {
		dispatch(fetchCommentsRequest())
		return axios.post(url, data)
			.then((resp) => {
				alert(`Your comment was added for \n commentable_id: ${commentable_id}`);
				return [resp.data];
			})
			.then((data) => {
				// normalize the data
				const normed = normalize(data, commentsListSchema);
				// pass indexes array and dictionary object 
				dispatch(addCommentToDictionary(normed.result, normed.entities.comments));
			}) 
			.then(() => {
				dispatch(getComments(commentable_id, commentable_type))
			})
			.then(() => dispatch(fetchCommentsSuccess()))
			.catch((err) => {
				dispatch(fetchCommentsFailure(err));
				alert( `There was a problem adding your comment. 
					\n "CommentableContainer"
					\n ${err}`,
				);
				console.log('ERROR=>', err);
			});
	};
}

export function deleteCommentFromApi(commentID) {

	return function thunk(dispatch) {
		dispatch(fetchCommentsRequest());
		
		return axios.delete(`api/comments/${commentID}`) 
			.then(resp => {
				console.log(44, '==>', resp);
				dispatch(	deleteComment(commentID));
			})
			.then(() => dispatch(fetchCommentsSuccess()))
			.catch(err => {
				dispatch(fetchCommentsFailure(err));
				console.log('Error', '==>', err);
			})
	}
}

// retrieve the comments object (array of objs) from the api
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
				console.log(99, '==>', data );
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
