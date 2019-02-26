// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';
import { toggleCommentsForm } from '../comments/redux/commentsActions';

// utilize indexes index to filter cached comments dictionary
// export function filterComments(indexes, dictionary) {
// 	const list = [];
// 	indexes.forEach((index) => {
// 		list.push(dictionary[index]);
// 	});
// 	return list;
// }

const mapStateToProps = state => ({
	// comments
	// comments: filterComments(
	// 	state.comments.indexes, 
	// 	state.comments.dictionary,
	// ),
	
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
