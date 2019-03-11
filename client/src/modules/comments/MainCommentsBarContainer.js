import { connect } from 'react-redux';
import { MainCommentsBar } from '.';
import { getComments } from './redux/commentsActions';
import { isMovieRegistered, registerMovie } from '../movies/redux/moviesActions';

const mapStateToProps = (state, props) => ({
	commentableID: props.commentableID,
	commentableType: props.commentableType,
	comments: props.comments,
	registered: props.registered,
	title: props.title,
});

const mapDispatchToProps = dispatch => ({
	getComments: () => dispatch(getComments()),
	registerMovie: (data) => dispatch(registerMovie(data)),
	isMovieRegistered: (imdbID) => dispatch(isMovieRegistered(imdbID))
});

// wrap around MainCommentsBar component
const MainCommentsBarContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(MainCommentsBar);

export default MainCommentsBarContainer;
