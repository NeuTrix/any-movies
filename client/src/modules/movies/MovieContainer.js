// container to gather movie logic
import { connect } from 'react-redux';
import MoviePage from './MoviePage'
// import actions to dispatch to props as needed

const mapStateToProps = state => ({
	comments: state.comments.comments,
	currMovie: state.movies.currMovie,
	currUser: state.users.currUser,
	isFormDisplayed: state.comments.isFormDisplayed,
	isMovieRegistered: state.movies.isMovieRegistered,
});

const MovieContainer = connect(mapStateToProps)(MoviePage);

export default MovieContainer
