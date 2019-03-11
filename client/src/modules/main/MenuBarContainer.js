// container logic for comments
import { connect } from 'react-redux';
import { getMovieData } from '../movies/redux/moviesActions';
import MenuBar from './MenuBar';

const mapStateToProps = state => ({
	movie: state.movies.current,
});

const mapDispatchToProps = dispatch => ({
	getMovieData: title => dispatch(getMovieData(title)),
});

const MenuBarContainer = connect(mapStateToProps, mapDispatchToProps)(MenuBar);

export default MenuBarContainer;
