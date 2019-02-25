import { connect } from 'react-redux';
import { CommentsBar } from '../comments';

const mapStateToProps = state => ({
	commentableID: state.comments.commentable,
	commentableType: 'Movie',
	indexes: state.comments.indexes,
});


const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
