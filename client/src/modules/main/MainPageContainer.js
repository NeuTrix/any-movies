// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';

export function filterComments(indexArray, dictionary) {
	const list = [];
	indexArray.forEach((index) => {
		list.push(dictionary[index]);
	});
	return list;
}

const mapStateToProps = state => ({
	// comments
	comments: filterComments(state.comments.comments, state.comments.dictionary),
	showForm: state.comments.showForm,
	// movies
	currMovie: state.movies.currMovie,
	isMovieRegistered: state.movies.isMovieRegistered,
	// users
	currUser: state.users.current,
});

const MainPageContainer = connect(mapStateToProps)(MainPage);

export default MainPageContainer;
