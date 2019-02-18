// container to gather movie logic
import { connect } from 'react-redux';
import MovieDisplay from './MovieDisplay';
// import oldMoviePage from './oldMoviePage';
// import actions to dispatch to props as needed

const mapStateToProps = state => ({
	comments: state.comments.comments, // simplify this
	currMovie: state.movies.currMovie,
	currUser: state.users.currUser,
	isFormDisplayed: state.comments.isFormDisplayed,
	isMovieRegistered: state.movies.isMovieRegistered,
	showingCommentForm: false, // placeholder
});

const MoviePageContainer = connect(mapStateToProps)(MovieDisplay);

export default MoviePageContainer;
