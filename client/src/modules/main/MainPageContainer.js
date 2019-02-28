// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';
import { toggleCommentsForm } from '../comments/redux/commentsActions';

const mapStateToProps = state => ({
	comments: state.comments.comments,
	movie: state.movies.current,
	commentableID: state.movies.imdbID,
});


const MainPageContainer = connect(mapStateToProps)(MainPage);

export default MainPageContainer;
