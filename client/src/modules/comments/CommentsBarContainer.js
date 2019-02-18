import React from 'react';
import { connect } from 'react-redux';
import CommentsBar from './CommentsBar';
import CommentCard from './CommentCard';
import { getComments } from './redux/commentsActions';

const makeComments = (comments) => {
	const list = comments.map(comm => (
		<div key={comm.id}>
      {comm.title}
		</div>
	));

	return list;

};

const mapStateToProps = state => ({
  commentsList: makeComments(state.comments.currComments),
  currUser: state.users.currUser,
});

const mapDispatchToProps = dispatch => ({
  handleGetComments: (comId, comClass) => {
    dispatch(getComments(comId, comClass));
  },
});

const CommentsBarContainer = connect(mapStateToProps, mapDispatchToProps)(CommentsBar);

export default CommentsBarContainer;
