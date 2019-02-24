// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';

// utilize subComments index to filter cached comments dictionary
export function filterComments(subComments, dictionary) {
	const list = [];
	subComments.forEach((index) => {
		list.push(dictionary[index]);
	});
	return list;
}

// export function findMovie(movieID, dictionary) {
// 	return dictionary[movieID]
// }

const mapStateToProps = state => ({
	// comments
	comments: filterComments(
		state.comments.subComments, 
		state.comments.dictionary,
	),
	
	showForm: state.comments.showForm,
	// movies
	currMovie: state.movies.current,
	registered: state.movies.registered,
	// users
	currUser: state.users.current,
});

const MainPageContainer = connect(mapStateToProps)(MainPage);

export default MainPageContainer;
