// container logic for comments
import { connect } from 'react-redux';
import { 
	getMovieData, 
	isMovieRegistered, 
	registerMovie, 
} from '../movies/redux/moviesActions';
import MenuBar from './MenuBar';

const mapStateToProps = state => ({
	currMovie: state.movies.currMovie,
	currUser: state.users.currUser,
	showingCommentForm: state.comments.showingCommentForm,
});

const mapDispatchToProps = dispatch => ({
	getMovieData: title => dispatch(getMovieData(title)),
	isMovieRegistered: imdbID => dispatch(isMovieRegistered(imdbID)),
	registerMovie: movie => dispatch(registerMovie(movie)),
});

const MenuBarContainer = connect(mapStateToProps, mapDispatchToProps)(MenuBar);

export default MenuBarContainer;
