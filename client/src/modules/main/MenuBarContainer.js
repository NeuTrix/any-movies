// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';

const mapStateToProps = state => ({
  // comments
  comments: state.comments.currComments,
  showingCommentForm: state.comments.showingCommentForm,
  // movies
	currMovie: state.movies.currMovie,
  isMovieRegistered: state.movies.isMovieRegistered,
  // users
	currUser: state.users.currUser,
})

const MainPageContainer = connect(mapStateToProps)(MainPage);

export default MainPageContainer;