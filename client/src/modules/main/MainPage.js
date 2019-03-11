// container to gather movie logic
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CommentsBarContainer } from '../comments';
// unclear why this linting error appears =>
import { MoviePageContainer } from '../movies';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired, // material UI
	comments: PropTypes.instanceOf(Array).isRequired, // app api object
	commentableID: PropTypes.string.isRequired, // app api object
	movie: PropTypes.instanceOf(Object).isRequired, // OMBD api object
	registered: PropTypes.bool.isRequired, // pulled from state
};

function MainPage({ classes, comments, commentableID, movie, registered }) {

	return (
		<div
			className={classes.posterBackground}
			style={{ backgroundImage: `url(${movie.Poster})` }}
		>
			<div className={classes.grid}>

				<div className={classes.favours}>
					<p> Favourites </p>
				</div>

				<div style={{ gridArea: 'comments' }}>
					<CommentsBarContainer
						comments={comments}
						commentableID={commentableID}
						commentableType="Movie"
						registered={registered}
						title={movie.Title} // OMDB api object
					/>
				</div>

				<div style={{ gridArea: 'movies' }}>
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
});

MainPage.propTypes = propTypes;

export default withStyles(styles)(MainPage);
