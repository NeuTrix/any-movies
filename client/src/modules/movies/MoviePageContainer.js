// container to gather movie logic
import { connect } from 'react-redux';
import MoviePage from './MoviePage';
// refactor path with index files
import { getComments } from '../comments/redux/commentsActions';
import { isMovieRegistered, getAllMovies } from './redux/moviesActions';
import { 
	getUsersFavourites, // grabs list of users favourited movies
	isFavourited,
} from '../favourites/redux/favouritesActions';

const mapStateToProps = (state) => ({
	movie: state.movies.current,
	user: state.users.current,
});

const mapDispatchToProps = dispatch => ({
	// get the current comments for this movie
	getComments: () => dispatch(getComments()),
	// get all registered movies in the api database
	getAllMovies: () => dispatch(getAllMovies()),
	// grabs list of users favourited movies
	getUsersFavourites: userID => dispatch(getUsersFavourites(userID)),
	//verify and update movie registration status
	isMovieRegistered: imdbID => dispatch(isMovieRegistered(imdbID)),
	isFavourited: ({ userID, movieID }) => dispatch(isFavourited({ userID, movieID })),
});

const MoviePageContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(MoviePage);

export default MoviePageContainer;
