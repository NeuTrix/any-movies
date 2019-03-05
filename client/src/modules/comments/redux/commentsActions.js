import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { actionCreator } from '../../helpers';

import {
	ADD_COMMENT_TO_DICTIONARY,
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	SET_MOVIE_COMMENTS,
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

 // set the current comment
export const setMovieComments = actionCreator(
	SET_MOVIE_COMMENTS,
	'indexes',
);
	
export const addCommentToDictionary = actionCreator(
	ADD_COMMENT_TO_DICTIONARY,
	'indexes',
	'dictionary',
);
	
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
				// return normed
			}) 
			.then(() => {
				dispatch(getComments(commentable_id, commentable_type))
			// 	return data
			})
			.catch((err) => {
				alert( `There was a problem adding your comment. 
					\n "CommentableContainer"
					\n ${err}`,
				);
				console.log('ERROR=>', err);
			});
	};
}

// retrieve the comments object (array of objs) from the api
export function getComments(commentableID, commentableType) {
	const path = commentableType === 'Comment' ? 'comments' : 'movies';
	const url = `/api/${path}/${commentableID}/comments`
	// using thunk middleware to return a fn from an action
	// named it `thunk` to clear linting err re:anonymous fucntions
	return function thunk(dispatch) {
		// alert state of request action
		dispatch(fetchCommentsRequest());
		// return the axios promise with the data/status
		return axios.get(url)
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
			// set the current comments for this
			.then((normed) => {
				if (commentableType === 'Movie') {
					dispatch(setMovieComments(normed.result, normed.entities.comments))
				}
			})
			// update the api success state
			.then(() => dispatch(fetchCommentsSuccess()))
			.catch((error) => {
				dispatch(fetchCommentsFailure(error));
				return console.log('---#getComments error--->', error);
			});
	};
}
