// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// import CommentableContainer from '../comments/CommentableContainer';
// import CommentableForm from '../comments/CommentableForm';
import { MoviePageContainer } from '../movies';
import { MenuBarContainer } from '../main';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	comments: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	currMovie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	currUser: PropTypes.instanceOf(Object).isRequired, // mocked
	// showingCommentForm: PropTypes.bool.isRequired,
	// delete this duplicate indicator =>
	// isMovieRegistered: PropTypes.bool.isRequired, // is this currently in api db?
	// ===> functions
	// addComment: PropTypes.func.isRequired, // adds a new review instance to api
	// addFavourite: PropTypes.func.isRequired, // add favourite for currMovie
	// handleMovieRegistration: PropTypes.func.isRequired, // search for currMovie
};

function MainPage({classes, comments, currMovie, currUser}) {

	return (
		<div
			className={classes.posterBackground}
			style={{ backgroundImage: `url(${currMovie.Poster})` }}
		>
			<div className={classes.grid}> 

				<div style={{gridArea: 'menu'}} >
					<MenuBarContainer />
				</div>

				<div style={{gridArea: 'addComment'}} >
					<h4> Add Comment </h4>
				</div>

				<div style={{gridArea: 'form'}} >
					<h4> New Comment Form </h4>
				</div>

				<div style={{gridArea: 'comments'}} >
					<h4> Comments Bar </h4>
				</div>

				<div style={{gridArea: 'favours'}} >
					<h4> Favourites </h4>
				</div>

				<div style={{gridArea: 'movies'}} >
					<MoviePageContainer />
				</div>

			</div>
		</div>
	)
}

const styles = theme => ({
	comments: {
		gridArea: 'comments',
	},
	grid: {
		backgroundColor: 'orange',
		display: 'inline-grid',
		gridRowGap: '8px',
		gridTemplateAreas: `
      "menu menu menu "
      "addComment addComment addComment"
			"form form form"
			"favours favours favours"
      "comments comments comments"
      "movies movies movies"
    `,
		gridTemplateColumns: '1fr 1fr 1fr',
		minHeight:600,
		maxWidth: 600,
		minWidth: 400,
		opacity: '0.93',
		padding: theme.spacing.unit,
	},

	posterBackground: {
		// adjust poster background based on screen size
		backgroundAttachment: 'fixed',
		textAlign: 'center',

		[theme.breakpoints.down('sm')]: {
			backgroundRepeat: 'repeat-y',
			backgroundSize: 'cover',
			left: 0,
			top: 0,
			zIndex: -10,
		},
	},
	toggleComment: {
		display: 'grid',
		marginBelow: theme.spacing.unit,
		padding: theme.spacing.unit,
		textAlign: 'left',
	},
});

MainPage.propTypes = propTypes;

export default withStyles(styles)(MainPage);


// class MainPage extends Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			showingCommentForm: false,
// 		};

// 		this.toggleCommentableForm = this.toggleCommentableForm.bind(this);
// 		this.handleCommentsClick = this.handleCommentsClick.bind(this);
// 	}

// 	// allows the addComment form to toggle on and off
// 	toggleCommentableForm() {
// 		this.setState({ showingCommentForm: !this.state.showingCommentForm });
// 	}

// 	handleCommentsClick(e) {
// 		e.preventDefault();
// 		// register the movie if not validated
// 		if (!this.props.isMovieRegistered) {
// 			// this.props.handleMovieRegistration();
// 		}
// 		this.toggleCommentableForm();
// 	}

// 	render({ classes, comments, currMovie, currUser, isFormDisplayed }) {
// 		// const { addComment, getMovieDataDataDataData } = this.props;
// 		const { showingCommentForm } = this.state;

// 		// generate comment form for current movie
// 		// const newCommentForm = (
// 			// <CommentableForm
// 			// 	// using OMDB obj vs api so need to define commentable_id/type
// 			// 	// commentable_id={currMovie.imdbID}
// 			// 	commentable_type="Movie"
// 			// 	currUser={currUser}
// 			// 	// submitAction={addComment}
// 			// 	toggleForm={this.toggleCommentableForm}
// 			// />
// 		// );

// 		return (
// 		// set style for poster.  need to access url variable
// 			<div
// 				className={classes.posterBackground}
// 				style={{ backgroundImage: `url(${currMovie.Poster})` }}
// 			>
// 				{/* fake opacity */}
// 				<div className={classes.grid}>

// 					<h4 style={{ background: 'aliceblue', gridArea: 'title' }}>

// 						<MenuBar
// 							isFormDisplayed={isFormDisplayed}
// 							toggleCommentableForm={this.toggleCommentableForm}
// 							// getMovieDataDataDataData={getMovieDataDataDataData}
// 						/>

// 					</h4>

// 					<div className={classes.toggleComment} style={{ gridArea: 'addComment' }}>
// 						<Link color="primary" onClick={this.handleCommentsClick}>
//               Comment on this movie?
// 						</Link>
// 					</div>

// 					<div style={{ gridArea: 'form' }}>
// 						{/* { showingCommentForm && newCommentForm } */}
// 					</div>

// 					<div style={{ gridArea: 'movies' }}>
// 						<MoviePageContainer />
// 					</div>

// 					<div className={classes.comments}>
// 						<CommentableContainer
// 							comments={comments}
// 							commentable={currMovie}
// 							currUser={currUser}
// 						/>

// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }