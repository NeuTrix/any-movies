import { connect } from 'react-redux';
import { addComment, getComments } from './redux/commentsActions';
import CommentableForm from './CommentableForm';

const mapStateToProps = (state, props) => ({
  commentableID: props.commentableID,
  commentableType: props.commentableType,
  toggleForm: props.toggleForm,
  user: state.users.current,
});

const mapDispatchToProps = dispatch => ({
  addComment: data => dispatch(addComment(data)),
  getComments: () => dispatch(getComments()),
});

const CommentableFormContainer = connect(mapStateToProps, mapDispatchToProps)(CommentableForm);

export default CommentableFormContainer;
