// set immutable constants for movie actions

// async actions
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

// set the current comment and commentable type/id
export const SET_COMMENTABLE = 'SET_COMMENTABLE';
// set index of sub-comments for the current commentable
// // export const SET_SUBCOMMENTS = 'SET_SUBCOMMENTS';
// CHECK_CACHE to see if comments is already in dictionary
// UPDATE_DICTIONARY add to current dictionary
// RESET_DICTIONARY: reset the dictionary for a new movie