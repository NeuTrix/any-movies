import { connect } from 'react-redux';
import { deleteComment, getComments } from './redux';
import { filterCommentsToArray } from '../helpers';
import CommentCard from './CommentCard';

const mapStateToProps = (state, ownProps) => {
	const { comment } = ownProps;
	const subComments = comment.sub_comments;
	const { dictionary } = state.comments;
	if (subComments) {
		return ({
			comment,
			subComments: filterCommentsToArray(subComments, dictionary),
		});
	}
	return subComments;
};

const mapDispatchToProps = dispatch => ({
	deleteComment: commentID => dispatch(deleteComment(commentID)),
	getComments:() => dispatch(getComments()),
});

const CommentCardsContainer = connect(mapStateToProps, mapDispatchToProps)(CommentCard);

export default CommentCardsContainer;
