// container to gather movie logic
import { connect } from 'react-redux';
import MoviePage from './MoviePage';
// refactor path with index files
import { getComments } from '../comments/redux/commentsActions'

const buildCommentsArray = (array) => {

	const comments  = array.map( item => {
		return (
			<div key={item.id}>
				{ item.title }
				{ item.body }
			</div>
		)
	});

	return comments;
}

const mapStateToProps = state => ({
	commentable: {},
	// state.comments.commentable,
	comments: [],
	// buildCommentsArray(state.comments.comments),
});

const mapDispatchToProps = dispatch => ({
	getComments: (title) => { dispatch(getComments(title)); },
});

const MoviePageContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(MoviePage);

export default MoviePageContainer;
