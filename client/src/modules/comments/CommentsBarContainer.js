import { connect } from 'react-redux';
import { CommentsBar } from '.';
import { getComments } from './redux/commentsActions';
import { registerMovie } from '../movies/redux/moviesActions';

const mapStateToProps = (state, props) => ({
	commentableID: props.commentableID,
	commentableType: props.commentableType,
	comments: props.comments,
	registered: state.movies.registered,
	title: props.title,
});

const mapDispatchToProps = dispatch => ({
	getComments: () => dispatch(getComments()),
	registerMovie: () => dispatch(registerMovie()),
});

// wrap around CommentsBar component
const CommentsBarContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(CommentsBar);

export default CommentsBarContainer;
