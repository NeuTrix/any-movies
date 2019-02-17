// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentableContainer from '../comments/CommentableContainer';
import CommentableForm from '../comments/CommentableForm';
import MovieDisplay from './MovieDisplay';
import { SearchAppBar } from '../app';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	comments: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	currMovie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	currUser: PropTypes.instanceOf(Object).isRequired, // mocked
	isFormDisplayed: PropTypes.bool.isRequired, // is this currently in api db?
	isMovieRegistered: PropTypes.bool.isRequired, // is this currently in api db?
	// ===> functions
	// addComment: PropTypes.func.isRequired, // adds a new review instance to api
	// getMovieData: PropTypes.func.isRequired, // search for currMovie
	// addFavourite: PropTypes.func.isRequired, // add favourite for currMovie
	// handleMovieRegistration: PropTypes.func.isRequired, // search for currMovie
};


class MoviePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displayingCommentForm: false,
		};

		this.toggleCommentableForm = this.toggleCommentableForm.bind(this);
		this.handleCommentsClick = this.handleCommentsClick.bind(this);
	}

	// allows the addComment form to toggle on and off
	toggleCommentableForm() {
		this.setState({ displayingCommentForm: !this.state.displayingCommentForm });
	}

	handleCommentsClick(e) {
		e.preventDefault();
		// register the movie if not validated
		if (!this.props.isMovieRegistered) {
			// this.props.handleMovieRegistration();
		}
		this.toggleCommentableForm();
	}

	render() {
		// deconstruct prop objects
		const {
			classes, 
			comments, 
			currMovie, 
			currUser, 
			isFormDisplayed,
		} = this.props;
		// deconstruct prop functions
		// const { addComment, getMovieData } = this.props;
		const { displayingCommentForm } = this.state;

		// generate comment form for current movie
		const newCommentForm = (
			<CommentableForm
				// using OMDB obj vs api so need to define commentable_id/type
				commentable_id={currMovie.imdbID}
				commentable_type="Movie"
				currUser={currUser}
				// submitAction={addComment}
				toggleForm={this.toggleCommentableForm}
			/>
		);

		return (
		// set style for poset her.  need to access url variable
			<div
				className={classes.posterBackground}
				style={{ backgroundImage: `url(${currMovie.Poster})` }}
			>
				{/* fake opacity */}
				<div className={classes.grid}>

					<h1 style={{ background: 'aliceblue', gridArea: 'title' }}>

						<SearchAppBar
							isFormDisplayed={isFormDisplayed}
							toggleCommentableForm={this.toggleCommentableForm}
							// getMovieData={getMovieData}
						/>

					</h1>

					<div className={classes.toggleComment} style={{ gridArea: 'addComment' }}>
						<Link color="primary" onClick={this.handleCommentsClick}>
              Comment on this movie?
						</Link>
					</div>

					<div style={{ gridArea: 'form' }}>
						{ displayingCommentForm && newCommentForm }
					</div>

					<div style={{ gridArea: 'movies' }}>
						<MovieDisplay 
							currMovie={currMovie} 
							currUser={currUser} 
						/>
					</div>

					<div className={classes.comments}>
						<CommentableContainer
							comments={comments}
							commentable={currMovie}
							currUser={currUser}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const styles = theme => ({
	comments: {
		gridArea: 'comments',
	},
	grid: {
		backgroundColor: 'white',
		display: 'inline-grid',
		gridRowGap: '8px',
		gridTemplateAreas: `
      "title title title "
      "addComment addComment ."
      "form form form"
      "comments comments comments"
      "movies movies movies"
    `,
		gridTemplateColumns: '1fr 1fr 1fr',
		maxWidth: 600,
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

MoviePage.propTypes = propTypes;

export default withStyles(styles)(MoviePage);
