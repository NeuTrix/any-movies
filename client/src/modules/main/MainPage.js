// container to gather movie logic
import React from 'react';
import PropTypes from 'prop-types';

// import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// import CommentableContainer from '../comments/CommentableContainer';
import CommentableForm from '../comments/CommentableForm';
import { MoviePageContainer } from '../movies';
// import { MenuBarContainer } from '../main';
import { MovieCommentsContainer } from '../movies';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	comments: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	currMovie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	// showingCommentForm: PropTypes.bool.isRequired,
	// ===> functions
	addComments: PropTypes.func.isRequired, // adds a new review instance to api
	// addFavourite: PropTypes.func.isRequired, // add favourite for currMovie
	// handleMovieRegistration: PropTypes.func.isRequired, // search for currMovie
};

function MainPage({ classes, currMovie }) {

	return (
		<div
			className={classes.posterBackground}
			style={{ backgroundImage: `url(${currMovie.Poster})` }}
		>
			<div className={classes.grid}> 

				<div style={{gridArea: 'comment'}} >
					<p> Add Comment </p>
				</div>

				<div style={{gridArea: 'form'}} >
					<p> New Comment Form </p>
					<CommentableForm />
				</div>

				<div style={{gridArea: 'comments'}} >
					<MovieCommentsContainer />
				</div>

				<div style={{gridArea: 'favours'}} >
					<p> Favourites </p>
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
		backgroundColor: 'whitesmoke',
		display: 'inline-grid',
		gridRowGap: '8px',
		gridTemplateAreas: `
      "comment comment comment"
			"form form form"
			"favours favours favours"
      "comments comments comments"
      "movies movies movies"
    `,
		gridTemplateColumns: '1fr 1fr 1fr',
		maxWidth: 600,
		opacity: '0.90',
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
