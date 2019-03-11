// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';

function findMovieComments(id, dictionary) {
	const comments = [];
	const keys = Object.keys(dictionary);
	keys.filter((key) => {
		if (dictionary[key].commentable_id === id) {
			comments.push(dictionary[key]);
		}
		return comments;
	});
	return comments;
}

const mapStateToProps = state => ({
	commentableID: state.movies.imdbID,
	comments: findMovieComments(state.movies.imdbID, state.comments.dictionary),
	movie: state.movies.current,
	registered: state.movies.registered,
});

const MainPageContainer = connect(mapStateToProps)(MainPage);

export default MainPageContainer;
