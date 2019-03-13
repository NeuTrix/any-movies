import { connect } from 'react-redux';
import { CommentsBar } from '.';
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
	isMovieRegistered: (imdbID, title) => dispatch(isMovieRegistered(imdbID, title))
});

// wrap around CommentsBar component
const CommentsBarContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(CommentsBar);

export default CommentsBarContainer;
