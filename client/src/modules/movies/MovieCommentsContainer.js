import React from 'react';
import { connect } from 'react-redux';
import { CommentsBar } from '../comments';
import { CommentCard } from '../comments';

export const buildCommentsArray = (array, user) => {

	const comments = array.map( item => {
		return (
			<CommentCard 
				key={item.id}
				commentable={item}
				commentable_id={item.id}
				commentable_type={item.type}
				currUser={user}
			/>
		)
	});

	return comments;
}

const mapStateToProps = state => ({
	commentable: state.comments.commentable,
	comments: buildCommentsArray(state.comments.comments, state.user),
	count: state.comments.count,
	indexes: state.comments.indexes,
	title: state.movies.title,
});

const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
