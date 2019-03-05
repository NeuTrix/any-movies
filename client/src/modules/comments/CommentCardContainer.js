import { connect } from 'react-redux';
import CommentCard from './CommentCard';
import { addComment } from './redux';
import { filterCommentsToArray } from '../helpers';

const mapStateToProps = (state, ownProps) => {
	console.log(77, '==>', ownProps.comment.sub_comments);
	const { comment } = ownProps;
	const subComments = comment.sub_comments;
	console.log(99, '==>', subComments);
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
