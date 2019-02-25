import { connect } from 'react-redux';
import { CommentsBar } from '../comments';

const mapStateToProps = state => ({
	commentable: state.comments.commentable,
	comments: state.comments.comments,
});

const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
