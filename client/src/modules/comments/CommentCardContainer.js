import { connect } from 'react-redux';
import CommentCard from './CommentCard';
import { addComments } from './redux';

const mapStateToProps = (state, ownProps) => ({
	comment: ownProps.comment,
});

const mapDispatchToProps = dispatch => ({
	addComments: data => dispatch(addComments(data)),
});

const CommentCardsContainer = connect(mapStateToProps, mapDispatchToProps)(CommentCard);

export default CommentCardsContainer;
