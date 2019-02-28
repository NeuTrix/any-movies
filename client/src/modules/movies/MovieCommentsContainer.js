import React from 'react';
import { connect } from 'react-redux';
import { CommentsBar } from '../comments';
import { CommentCard } from '../comments';

export const buildCommentsArray = (array, user) => {
	const comments = array.map((item) => 
		<CommentCard
			key={item.id}
			comment={item}
			subComments={item.sub_comments}
		/>
	);

	return comments;
};

const mapStateToProps = state => ({
	comments: buildCommentsArray(state.comments.comments, state.user),
	count: state.comments.count,
	title: state.movies.title,
});

// wrap around CommentsBar component for initial hydration
const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
