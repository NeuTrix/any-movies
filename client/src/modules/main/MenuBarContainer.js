// container logic for comments
import { connect } from 'react-redux';
import { getMovieData } from '../movies/redux/moviesActions';
import MenuBar from './MenuBar';

const mapStateToProps = state => ({
	showingCommentForm: state.comments.showingCommentForm,
	// movies
	currMovie: state.movies.currMovie,
	// isMovieRegistered: state.movies.isMovieRegistered,
	// users
	currUser: state.users.currUser,
});

const mapDispatchToProps = dispatch => ({
	getMovieData: (title) => { dispatch(getMovieData(title)); },
});

const MenuBarContainer = connect(mapStateToProps, mapDispatchToProps)(MenuBar);

export default MenuBarContainer;
