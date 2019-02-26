import { connect } from 'react-redux';
import { addComments, getComments } from './redux/commentsActions';
import CommentableForm from './CommentableForm';

const mapStateToProps = state => ({
  commentable: state.comments.commentable,
  currUser: state.users.current,
});

const mapDispatchToProps = dispatch => ({
	addComments: data => dispatch(addComments(data)),
});

const CommentableFormContainer = connect(mapStateToProps, mapDispatchToProps)(CommentableForm);

export default CommentableFormContainer;