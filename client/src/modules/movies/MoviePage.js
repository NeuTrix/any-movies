import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FavouritesButton } from '../favourites';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	currMovie: PropTypes.instanceOf(Object).isRequired,
};

function MoviePage({ classes, currMovie }) {

	// generate list of movie ratings
	const ratings = currMovie.Ratings && currMovie.Ratings.map((rating) => {
		return (
			<div key={currMovie.imdbID} className={classes.ratingUnit}>
				<div style={{ gridArea: 'critic' }}>
					{`${rating.Source} :`}
				</div>
				<div style={{ gridArea: 'grade', textAlign: 'right' }}>
					{rating.Value}
				</div>
			</div>
		);
	});

	return (
		<div className={classes.main}>
			<div className={classes.titlebar}>
				<div className={classes.fav}>
				{/* faking the curr use */}
					<FavouritesButton currUserId={1} currMovie={currMovie} />
				</div>

				<div className={classes.title} >
					<Typography variant="h4"> { currMovie.Title } </Typography>
				</div>
			</div>

			<div className={classes.image}>
				<img
					className={classes.poster}
					src={currMovie.Poster}
					alt="currMovie poster"
				/>
				<div> {`Released...${currMovie.Year}`} </div> <br />
				<div> {'Rated'} <h3> { currMovie.Rated } </h3> </div>
				<div> <h6> { `imdbID: ${currMovie.imdbID}` } </h6> </div>

			</div>

			<div className={classes.info}>

				<div> <h4> {'Genre:'} </h4> <p> {currMovie.Genre} </p> </div>
				<div> <h4> { 'Director:' } </h4> <p> {currMovie.Director} </p> </div>
				<div> <h4> {' Starring:' } </h4> <p> { currMovie.Actors } </p> </div>

			</div>

			<div className={classes.ratings}>
				<div> <h4> Critics Ratings: </h4> <p> { ratings } </p> <br /> </div>
			</div>

			<div className={classes.plot}>
				<h4> Movie Plot: </h4>
				<p> { currMovie.Plot } </p>
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
		backgroundColor: 'lightgrey',
		borderBottom: '1px solid lightgrey',
		display: 'inline-grid',
		fontColor: 'white',
		gridArea: 'titlebar',
		gridTemplateAreas: `
			"fav title"
		`,
		gridTemplateColumns: '1fr 9fr',
		padding: theme.spacing.unit,
	},
});

MoviePage.propTypes = propTypes;

export default withStyles(styles)(MoviePage);
