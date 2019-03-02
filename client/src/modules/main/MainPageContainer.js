// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';

const mapStateToProps = state => ({
	commentableID: state.movies.imdbID,
	comments: state.comments.thisMovie,
	movie: state.movies.current,
});

const MainPageContainer = connect(mapStateToProps)(MainPage);

export default MainPageContainer;
