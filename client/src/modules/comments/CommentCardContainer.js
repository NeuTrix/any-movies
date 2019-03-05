import { connect } from 'react-redux';
import CommentCard from './CommentCard';
import { addComment } from './redux';
import { filterCommentsToArray } from '../helpers';

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
};

const mapDispatchToProps = dispatch => ({
	addComment: data => dispatch(addComment(data)),
});

const CommentCardsContainer = connect(mapStateToProps, mapDispatchToProps)(CommentCard);

export default CommentCardsContainer;
