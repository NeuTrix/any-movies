// container to gather movie logic
import { connect } from 'react-redux';
import MoviePage from './MoviePage';

const mapStateToProps = state => ({
	currMovie: state.movies.current,
});

const MoviePageContainer = connect(mapStateToProps)(MoviePage);

export default MoviePageContainer;
