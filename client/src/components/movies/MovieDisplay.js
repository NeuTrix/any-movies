import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	curr_movie: PropTypes.instanceOf(Object).isRequired,
};

function MovieDisplay(props) {
	const { classes, curr_movie } = props;

	// generate list of movie ratings
	const ratings = curr_movie.Ratings && curr_movie.Ratings.map((rating, index) => (
		<div key={index} className={classes.ratingUnit}>
			<div style={{ gridArea: 'critic' }}>
				{' '}
				{rating.Source}
:


				{' '}
			</div>
			<div style={{ gridArea: 'grade', textAlign: 'right' }}>
				{' '}
				{rating.Value}
				{' '}
			</div>
		</div>
	));

	// if actors listed, make a list
	const actors = curr_movie.Actors && curr_movie.Actors.split(',').map((actor, index) => (
		<div key={index}>
			{' '}
-


			
{actor}
			{' '}

		</div>
	));

	return (
		<div className={classes.main}>

			<div className={classes.title}>
				<Typography variant="h4">
					{' '}
					{ curr_movie.Title }
					{' '}
				</Typography>
			</div>

			<div className={classes.image}>
				<img className={classes.poster} src={curr_movie.Poster} alt="curr_movie poster" />
				<div>
					{' '}
Released:


					
{curr_movie.Year}
					{' '}

				</div>
				{' '}
				<br />
				<div>
					{' '}
Rated


					<h3>
	{curr_movie.Rated}
	{' '}
					</h3>
				</div>
				<div>
					{' '}
					<h6>
						{' '}
imdbID:


						{ curr_movie.imdbID }
					</h6>
					{' '}
				</div>
			</div>

			<div className={classes.info}>

				<div>
					<h4> Genre: </h4>
					<div>
						{' '}
-


						
{curr_movie.Genre}
						{' '}

					</div>
				</div>

				<div>
					<h4> Director: </h4>
					<div>
						{' '}
-


						
{curr_movie.Director}
						{' '}

					</div>
				</div>

				<div>
					<h4> Starring: </h4>
					<div>
						{' '}
						{ actors }
						{' '}
					</div>
				</div>

			</div>

			<div className={classes.ratings}>
				<div>
					<h4> Critics Ratings: </h4>
					<div>
						{' '}
						{ ratings }
						{' '}
					</div>
					{' '}
					<br />
				</div>
			</div>

			<div className={classes.plot}>
				<h4> Movie Plot: </h4>
				<div>
					{' '}
					{curr_movie.Plot}
					{' '}
				</div>
			</div>

		</div>
	);
}

const styles = theme => ({
	main: {
		border: '1px solid lightgrey',
		display: 'inline-grid',
		gridTemplateAreas: `
      "title title"
      "image info"
      "plot plot"
      "ratings ratings"
    `,
		gridTemplateColumns: '2fr 3fr',
	},

	info: {
		textAlign: 'left',
		gridArea: 'info',
		padding: theme.spacing.unit * 2,
	},

	image: {
		gridArea: 'image',
		padding: theme.spacing.unit,
		borderRight: '1px solid lightgrey',
	},

	poster: {
		maxWidth: 125,
		padding: theme.spacing.unit,
	},

	plot: {
		gridArea: 'plot',
		border: '1px solid lightgrey',
		padding: theme.spacing.unit,
		textAlign: 'left',
	},

	ratings: {
		gridArea: 'ratings',
		textAlign: 'left',
		padding: theme.spacing.unit,
	},

	ratingUnit: {
		display: 'grid',
		gridTemplateAreas: `
      "critic grade"
    `,
		gridTemplateColumns: '3rf 1fr',
	},

	title: {
		backgroundColor: 'lightgrey',
		fontColor: 'white',
		borderBottom: '1px solid lightgrey',
		gridArea: 'title',
		padding: theme.spacing.unit,
	},

});

MovieDisplay.propTypes = propTypes;

export default withStyles(styles)(MovieDisplay);
