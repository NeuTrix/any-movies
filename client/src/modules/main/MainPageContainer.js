// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';

export function filterComments(subComments, dictionary) {
	const list = [];
	subComments.forEach((index) => {
		list.push(dictionary[index]);
	});
	return list;
}

const mapStateToProps = state => ({
	// comments
	subComments: filterComments(
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
