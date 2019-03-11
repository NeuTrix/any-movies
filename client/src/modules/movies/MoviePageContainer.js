// container to gather movie logic
import { connect } from 'react-redux';
import MoviePage from './MoviePage';
// refactor path with index files
import { getComments } from '../comments/redux/commentsActions';
import { isMovieRegistered } from './redux/moviesActions';

const mapStateToProps = state => ({
	currMovie: state.movies.current,
});

const mapDispatchToProps = dispatch => ({
	// get the current comments for this movie
	getComments: () => dispatch(getComments()),
	//verify and update movie registration status
	isMovieRegistered: (imdbID) => dispatch(isMovieRegistered(imdbID)),
});

const MoviePageContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(MoviePage);

export default MoviePageContainer;
