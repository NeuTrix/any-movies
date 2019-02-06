// container to gather movie logic
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentableForm from '../comments/CommentableForm';
import CommentableContainer from '../comments/CommentableContainer';
import MovieDisplay from './MovieDisplay';
import SearchAppBar from '../tools/SearchAppBar';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	comments: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	curr_movie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	curr_user: PropTypes.instanceOf(Object).isRequired, // mocked
	movieIsRegistered: PropTypes.bool.isRequired, // is this currently in api db?
	// ===> functions
	addComment: PropTypes.func.isRequired, // adds a new review instance to api
	getMovieData: PropTypes.func.isRequired, // search for curr_movie
	handleMovieRegistration: PropTypes.func.isRequired, // search for curr_movie
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
		if (!this.props.movieIsRegistered) {
			this.props.handleMovieRegistration();
		}
		this.toggleCommentableForm();
	}

	render() {
		// deconstruct prop objects
		const {
			classes, comments, curr_movie, curr_user,
		} = this.props;
		// deconstruct prop functions
		const { addComment, getMovieData } = this.props;
		const { displayingCommentForm } = this.state;

		// generate comment form for current movie
		const newCommentForm = (
			<CommentableForm
				// using OMDB obj vs api so need to define commentable_id/type
				commentable_id={curr_movie.imdbID}
				commentable_type="Movie"
				curr_user={curr_user}
				submitAction={addComment}
				toggleForm={this.toggleCommentableForm}
			/>
		);

		return (
		// set style for poset her.  need to access url variable
			<div
				className={classes.posterBackground}
				style={{ backgroundImage: `url(${curr_movie.Poster})` }}
			>
				{/* fake opacity */}
				<div className={classes.grid}>

					<h1 style={{ background: 'aliceblue', gridArea: 'title' }}>

						<SearchAppBar
							isFormDisplayed={this.state.displayingCommentForm}
							toggleCommentableForm={this.toggleCommentableForm}
							getMovieData={getMovieData}
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
						<MovieDisplay curr_movie={curr_movie} posterUrl={curr_movie.Poster} />
					</div>

					<div className={classes.comments}>
						<CommentableContainer
							comments={comments}
							commentable={curr_movie}
							curr_user={curr_user}
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

	toggleComment: {
		display: 'grid',
		marginBelow: theme.spacing.unit,
		padding: theme.spacing.unit,
		textAlign: 'left',
	},


	posterBackground: {
		// adjust poster background based on screen size
		backgroundAttachment: 'fixed',

		[theme.breakpoints.down('sm')]: {
			backgroundRepeat: 'repeat-y',
			backgroundSize: 'cover',
			left: 0,
			top: 0,
			zIndex: -10,
		},
	},
});

MoviePage.propTypes = propTypes;

export default withStyles(styles)(MoviePage);
