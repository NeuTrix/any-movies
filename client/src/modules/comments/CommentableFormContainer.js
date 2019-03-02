import { connect } from 'react-redux';
import { addComment } from './redux/commentsActions';
import CommentableForm from './CommentableForm';

const mapStateToProps = (state, props) => ({
  // must pass a commentable object with an id (and type if available)
  commentableID: props.commentableID,
  commentabletype: props.commentabletype,
  user: state.users.current,
});

const mapDispatchToProps = dispatch => ({
	addComment: data => dispatch(addComment(data)),
});

const CommentableFormContainer = connect(mapStateToProps, mapDispatchToProps)(CommentableForm);

export default CommentableFormContainer;
