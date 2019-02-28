// container to gather movie logic
import React from 'react';
import PropTypes from 'prop-types';

// import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// import CommentableContainer from '../comments/CommentableContainer';
import { CommentableFormContainer } from '../comments';
// import { MenuBarContainer } from '../main';
import { MovieCommentsContainer } from '../movies';
// unclear why this linting error appears =>
import { MoviePageContainer } from '../movies';
// import { toggleCommentsForm } from '../comments/redux/commentsActions';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	// comments: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	currMovie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	showForm: PropTypes.bool.isRequired,
	// ===> functionspcomment
	toggleCommentsForm: PropTypes.func.isRequired, // toggles comments form display
	// addFavourite: PropTypes.func.isRequired, // add favourite for currMovie
	// handleMovieRegistration: PropTypes.func.isRequired, // search for currMovie
};

function MainPage({ classes, currMovie, comments, showForm, toggleCommentsForm  }) {

	const onClick = (e) => {
		e.preventDefault();
		toggleCommentsForm();
	}
	return (
		<div
			className={classes.posterBackground}
			style={{ backgroundImage: `url(${currMovie.Poster})` }}
		>
			<div className={classes.grid}> 
				<div className={classes.favours}>
					<p> Favourites </p>
				</div>

				<div style={{gridArea: 'addComment'}} >
					<button onClick={onClick}> 
						{ !showForm ? 'Show Comment Form' : 'Hide Comment Form' }
					</button>
				</div>

				<div style={{gridArea: 'form'}} >
					{ showForm && <CommentableFormContainer /> }
				</div>

				<div style={{gridArea: 'comments'}} >
					<MovieCommentsContainer />
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

	favours: {
		gridArea: 'favours',
		marginTop: theme.spacing.unit * 5,
	},

	grid: {
		backgroundColor: 'whitesmoke',
		display: 'inline-grid',
		gridRowGap: '8px',
		gridTemplateAreas: `
		"favours favours favours"
      "addComment addComment addComment"
			"form form form"
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
