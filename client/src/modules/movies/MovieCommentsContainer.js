import { connect } from 'react-redux';
import { CommentsBar } from '../comments';


const mapStateToProps = state => ({
	// commentable: state.
	commentableID: state.movies.current.imdbID,
	commentableType: 'Movie',
});


const MovieCommentsContainer = connect(mapStateToProps)(CommentsBar);

export default MovieCommentsContainer;
