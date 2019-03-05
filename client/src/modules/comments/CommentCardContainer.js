import { connect } from 'react-redux';
import { addComment } from './redux';
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
	addComment: data => dispatch(addComment(data)),
});

const CommentCardsContainer = connect(mapStateToProps, mapDispatchToProps)(CommentCard);

export default CommentCardsContainer;
