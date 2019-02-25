import React from 'react';
import { connect } from 'react-redux';
import { CommentsBar } from '../comments';

const buildCommentsArray = (array) => {

	const comments  = array.map( item => {
		return (
			<div key={item.id}>
				{ item.title }
				{ item.body }
			</div>
		)
	});

	return comments;
}

const mapStateToProps = state => ({
	commentable: state.comments.commentable,
	comments: buildCommentsArray(state.comments.comments),
});

const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
