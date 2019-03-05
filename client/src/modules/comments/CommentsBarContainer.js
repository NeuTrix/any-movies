import { connect } from 'react-redux';
import { CommentsBar } from '.';
import { getComments } from './redux/commentsActions'

const mapStateToProps = (state, props) => ({
	commentableID: props.commentableID,
	commentableType: props.commentableType,
	comments: props.comments,
	title: props.title,
});

const mapDispatchToProps = dispatch => ({
	getComments: () => dispatch(getComments()),
	// getComments: (id, type) => dispatch(getComments(id, type)),
});

// wrap around CommentsBar component
const CommentsBarContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(CommentsBar);

export default CommentsBarContainer;
