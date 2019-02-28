import { connect } from 'react-redux';
import { CommentsBar } from '.';

const mapStateToProps = (state, props) => ({
	commentableID: props.commentableID,
	commentableType: props.commentableType,
	comments: props.comments,
	title: props.title,
});

// wrap around CommentsBar component
const CommentsBarContainer = connect(mapStateToProps)(CommentsBar);

export default CommentsBarContainer;
