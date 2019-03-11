// container logic for comments
import { connect } from 'react-redux';
import { getMovieData } from '../movies/redux/moviesActions';
import MenuBar from './MenuBar';

const mapDispatchToProps = dispatch => ({
	getMovieData: title => dispatch(getMovieData(title)),
});

const MenuBarContainer = connect(null, mapDispatchToProps)(MenuBar);

export default MenuBarContainer;
