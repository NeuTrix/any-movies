import { connect } from 'react-redux';
import { addComment, editComment } from './redux/commentsActions';
import CommentableForm from './CommentableForm';

const mapStateToProps = (state, props) => ({
  commentableID: props.commentableID,
  commentableType: props.commentableType,
  editMode: props.editMode,
  // allow the form to toggle on submit (based on parent state)
  toggleForm: props.toggleForm,
  user: state.users.current,
});

const mapDispatchToProps = dispatch => ({
  addComment: data => dispatch(addComment(data)),
  editComment: (id, data) => dispatch(editComment(id, data)),
});

const CommentableFormContainer = connect(mapStateToProps, mapDispatchToProps)(CommentableForm);

export default CommentableFormContainer;
