import { connect } from 'react-redux';
import { addComment, editComment } from './redux/commentsActions';
import CommentableForm from './CommentableForm';

const mapStateToProps = (state, props) => ({
  commentableID: props.commentableID,
  commentableType: props.commentableType,
  // allow the form to toggle on submit (based on parent state)
  toggleForm: props.toggleForm,
  user: state.users.current,
});

const mapDispatchToProps = dispatch => ({
  addComment: data => dispatch(addComment(data)),
  editComment: data => dispatch(editComment(data)),
});

const CommentableFormContainer = connect(mapStateToProps, mapDispatchToProps)(CommentableForm);

export default CommentableFormContainer;
