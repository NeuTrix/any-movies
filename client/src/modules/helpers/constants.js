// =====> COMMENTS constants

// FETCH actions
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';
export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';

// ADD actions
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

// DELETE actions
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';

// EDIT actions
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';
export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';

// set the current comment and commentable type/id
export const TOGGLE_COMMENTS_FORM = 'TOGGLE_COMMENTS_FORM';
export const UPDATE_DICTIONARY = 'UPDATE_DICTIONARY';
// SET_indexes = 'SET_SUBCOMMENTS'// specific reset of subcomments
// CHECK_CACHE to see if comments is already in dictionary
// UPDATE_DICTIONARY add to current dictionary
// RESET_DICTIONARY: reset the dictionary for a new movie
// SHOW_COMMENTE_FORM // Determine when new/edit form is displayed


//  =====> MOVIE constants

// async actions
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';
export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
// unused
// export const SET_CURRENT_MOVIE = 'SET_CURRENT_MOVIE';
