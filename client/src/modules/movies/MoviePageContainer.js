// container to gather movie logic
import { connect } from 'react-redux';
import MoviePage from './MoviePage';
// refactor path with index files
import { getComments } from '../comments/redux/commentsActions'

const mapStateToProps = state => ({
	currMovie: state.movies.current,
});

const mapDispatchToProps = dispatch => ({
	getComments: (title) => { dispatch(getComments(title)); },
});

const MoviePageContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(MoviePage);

export default MoviePageContainer;
