import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import FavoriteTwoTone from '@material-ui/icons/FavoriteTwoTone';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	curr_movie: PropTypes.instanceOf(Object).isRequired,
	favouriteMovie: PropTypes.func.isRequired, // add to favourites
};

function MovieDisplay(props) {
	const { classes, curr_movie } = props;

	// add to favourites
	const onClick = (e) => {
		e.preventDefault();
		props.favouriteMovie();
	};

	// generate list of movie ratings
	const ratings = curr_movie.Ratings && curr_movie.Ratings.map((rating) => (
		<div key={curr_movie.imdbID} className={classes.ratingUnit}>
			<div style={{ gridArea: 'critic' }}>
				{`${rating.Source} :`}
			</div>
			<div style={{ gridArea: 'grade', textAlign: 'right' }}>
				{rating.Value}
			</div>
		</div>
	));

	// if actors listed, make a list
	const actors = curr_movie.Actors && curr_movie.Actors.split(',')
		.map((actor) => ( <div key={curr_movie.imdbID}> - {actor} </div> )
	);

	return (
		<div className={classes.main}>
			
			<div className={classes.titlebar}>
				<div className={classes.fav}>
					<Button 
						variant="fav"
						onClick={onClick}
					>
						<FavoriteTwoTone color="primary" />
					</Button>
				</div>

				<div className={classes.title} >
					<Typography variant="h4"> 
						{ curr_movie.Title } 
					</Typography>
				</div>
			</div>

			<div className={classes.image}>
				<img className={classes.poster} src={curr_movie.Poster} alt="curr_movie poster" />
				<div>
					{`Released...${curr_movie.Year}`}
				</div>
				<br />

				<div>
					{'Rated'}
					<h3> { curr_movie.Rated } </h3>
				</div>

				<div>
					<h6> { `imdbID: ${curr_movie.imdbID}` } </h6>
				</div>

			</div>

			<div className={classes.info}>

				<div>
					<h4> {'Genre:'} </h4>
					<p> {curr_movie.Genre} </p>
				</div>

				<div>
					<h4> { 'Director:' } </h4>
					<p> {curr_movie.Director} </p>
				</div>

				<div>
					<h4> {' Starring:' } </h4>
					<p> { actors } </p>
				</div>

			</div>

			<div className={classes.ratings}>
				<div>
					<h4> Critics Ratings: </h4>
					<p> { ratings } </p>
					<br />
				</div>
			</div>

			<div className={classes.plot}>
				<h4> Movie Plot: </h4>
				<p> { curr_movie.Plot } </p>
			</div>

		</div>
	);
}

const styles = theme => ({

	fav: {
		display: 'inherit',
		gridArea: 'fav',
		padding: theme.spacing.unit,
		placeContent: 'center',
	},

	image: {
		borderRight: '1px solid lightgrey',
		gridArea: 'image',
		padding: theme.spacing.unit,
	},

	info: {
		gridArea: 'info',
		padding: theme.spacing.unit * 2,
		textAlign: 'left',
	},

	main: {
		border: '1px solid lightgrey',
		display: 'inline-grid',
		gridTemplateAreas: `
      "titlebar titlebar"
      "image info"
      "plot plot"
      "ratings ratings"
    `,
		gridTemplateColumns: '2fr 3fr',
	},

	plot: {
		border: '1px solid lightgrey',
		gridArea: 'plot',
		padding: theme.spacing.unit,
		textAlign: 'left',
	},

	poster: {
		maxWidth: 125,
		padding: theme.spacing.unit,
	},

	ratingUnit: {
		display: 'grid',
		gridTemplateAreas: `
      "critic grade"
    `,
		gridTemplateColumns: '3rf 1fr',
	},

	ratings: {
		gridArea: 'ratings',
		padding: theme.spacing.unit,
		textAlign: 'left',
	},

	title: {
		fontColor: 'white',
		gridArea: 'title',
		padding: theme.spacing.unit,
	},

	titlebar: {
		display: 'inline-grid',
		backgroundColor: 'lightgrey',
		borderBottom: '1px solid lightgrey',
		fontColor: 'white',
		gridArea: 'titlebar',
		gridTemplateAreas: `
			"fav title"
		`,
		gridTemplateColumns: '1fr 9fr',
		padding: theme.spacing.unit,
	},


});

MovieDisplay.propTypes = propTypes;

export default withStyles(styles)(MovieDisplay);
