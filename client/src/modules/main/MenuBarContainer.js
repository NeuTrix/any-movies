// container logic for comments
import { connect } from 'react-redux';
import MainPage from './MainPage';

const mapStateToProps = state => ({
  comments: state.comments.currComments,
	currMovie: state.movies.currMovie,
	currUser: state.movies.currUser,
  showingCommentForm: state.comments.showingCommentForm,
  isMovieRegistered: state.movies.isMovieRegistered,
})

const MainPageContainer = connect(mapStateToProps)(MainPage);

export default MainPageContainer;