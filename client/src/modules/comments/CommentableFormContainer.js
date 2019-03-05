import { connect } from 'react-redux';
import { addComment, getComments } from './redux/commentsActions';
import CommentableForm from './CommentableForm';

const mapStateToProps = (state, props) => ({
  // must pass a commentable object with an id (and type if available)
  commentableID: props.commentableID,
  commentableType: props.commentableType,
  user: state.users.current,
});

const mapDispatchToProps = dispatch => ({
  addComment: data => dispatch(addComment(data)),
  getComments: (id, type) => dispatch(getComments(id, type)),
});

const CommentableFormContainer = connect(mapStateToProps, mapDispatchToProps)(CommentableForm);

export default CommentableFormContainer;
