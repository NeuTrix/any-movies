import { connect } from 'react-redux';
import { addComments } from './redux/commentsActions';
import CommentableForm from './CommentableForm';

const mapStateToProps = state => ({
  commentable: state.comments.commentable,
});

// const mapDispatchToProps = dispatch => ({
	// addComments: data => dispatch(addComments(data)),
// });

const CommentableFormContainer = connect(mapStateToProps)(CommentableForm);

export default CommentableFormContainer;
CommentableForm