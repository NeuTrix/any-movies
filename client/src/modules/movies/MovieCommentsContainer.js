import { connect } from 'react-redux';
import { CommentsBar } from '../comments';

const mapStateToProps = state => ({
	comments: state.comments.comments,
	count: state.comments.count,
	title: state.movies.title,
});

// wrap around CommentsBar component for initial hydration
const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
