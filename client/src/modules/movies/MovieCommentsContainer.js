import React from 'react';
import { connect } from 'react-redux';
import CommentsBar from '../comments';


const mapStateToProps = state => ({
  // commentable: state.
  commenttableID: state.currMovie.imdbID,
  commentableType: 'Movie',
});


const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
