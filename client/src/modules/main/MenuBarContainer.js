// container logic for comments
import { connect } from 'react-redux';
import { getMovieData } from '../movies/redux/moviesActions';
import MenuBar from './MenuBar';

const mapStateToProps = state => ({
	showingCommentForm: state.comments.showingCommentForm,
	// movies
	currMovie: state.movies.currMovie,
	// registered: state.movies.registered,
	// users
	currUser: state.users.currUser,
});

const mapDispatchToProps = dispatch => ({
	// are brackets needed here?
	getMovieData: (title) => { dispatch(getMovieData(title)); },
});

const MenuBarContainer = connect(mapStateToProps, mapDispatchToProps)(MenuBar);

export default MenuBarContainer;
