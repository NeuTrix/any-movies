import { connect } from 'react-redux';
import { CommentsBar } from '../comments';

const mapStateToProps = state => ({
	commentableID: state.movies.imdbID,
	commentableType: 'Movie',
	comments: state.comments.comments,
	title: state.movies.title,
});

// wrap around CommentsBar component for initial hydration
const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
