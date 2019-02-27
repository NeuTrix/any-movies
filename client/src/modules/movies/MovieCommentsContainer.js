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
	comments: buildCommentsArray(state.comments.comments, state.user),
	count: state.comments.count,
	title: state.movies.title,
});

// wrap around CommentsBar component for initial hydration
const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
