import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { actionCreator } from '../../helpers';

import {
	ADD_COMMENTS_TO_DICTIONARY,
	TOGGLE_COMMENTS_FORM,
	UPDATE_COMMENTS_COUNT,
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	SET_COMMENTABLE,
} from '../../helpers/constants';


// update the api request property
export const fetchCommentsRequest = actionCreator(
	FETCH_COMMENTS_REQUEST
);

// manage the data returned from comments GET call api
// need to factor out SET_COMMENTS from the success action
export const fetchCommentsSuccess = actionCreator(
	FETCH_COMMENTS_SUCCESS
);

// captures the error messages on fail
export const fetchCommentsFailure = actionCreator(
	FETCH_COMMENTS_FAILURE, 
	'error'
);

 // set the current comment
export const setCommentable = actionCreator(
	SET_COMMENTABLE,
	'commentableID',
	'commentableType'
);

export const addCommentsToDictionary = actionCreator(
	ADD_COMMENTS_TO_DICTIONARY,
	'indexes',
	'dictionary'
);

export const updateCommentsCount = actionCreator(
	UPDATE_COMMENTS_COUNT,
	'count'
);

export const toggleCommentsForm = actionCreator(
	TOGGLE_COMMENTS_FORM
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
				dispatch(getComments(commentable_id, commentable_type))
				return data
			})
			.then((data) => {
				// normalize the data
				const normed = normalize(data, commentsListSchema);
				const indexes = normed.result; // an array of indices
				const dictionary = normed.entities.comments; // an object map
				dispatch(addCommentsToDictionary(indexes, dictionary));
			})
			.then(() => {
				dispatch(toggleCommentsForm())
			})
			.catch((err) => {
				alert( `There was a problem adding your comment. 
					\n "CommentableContainer"
					\n ${err}`
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
				dispatch(addCommentsToDictionary(indexes, dictionary));
				return indexes
			})
			// update the counter
			.then((indexes) => dispatch(updateCommentsCount(indexes.length)))
			// update the api success state
			.then(() => dispatch(fetchCommentsSuccess()))
			// set the current commentable object id
			.then(() => dispatch(setCommentable(commentableID, commentableType)))
			.catch((error) => {
				dispatch(fetchCommentsFailure(error));
				return console.log('---#getComments error--->', error);
			});
	};
}
