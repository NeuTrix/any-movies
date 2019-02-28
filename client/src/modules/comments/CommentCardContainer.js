import { connect } from 'react-redux';
import CommentCard from './CommentCard';
import { addComment } from './redux';

const mapStateToProps = (state, ownProps) => ({
	comment: ownProps.comment,
});

const mapDispatchToProps = dispatch => ({
	addComment: data => dispatch(addComment(data)),
});

const CommentCardsContainer = connect(mapStateToProps, mapDispatchToProps)(CommentCard);

export default CommentCardsContainer;
