// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';
import { toggleCommentsForm } from '../comments/redux/commentsActions';

const mapStateToProps = state => ({
	showForm: state.comments.showForm,
	// movies
	currMovie: state.movies.current,
	registered: state.movies.registered,
	// users
	currUser: state.users.current,
});

const mapDispatchToProps = dispatch => ({
	toggleCommentsForm: () => dispatch(toggleCommentsForm()),
})


const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage);

export default MainPageContainer;
