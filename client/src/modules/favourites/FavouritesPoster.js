import React from 'react';
import { Card, CardMedia, withStyles, CardHeader } from '@material-ui/core';
import PropTypes from 'prop-types';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	poster: PropTypes.instanceOf(String).isRequired,
	title: PropTypes.instanceOf(String).isRequired,
	// function
	getMovieData: PropTypes.instanceOf(Function).isRequired,
};

const FavouritesPoster = (props) => {
	const { classes, getMovieData, poster, title } = props
;	
	const switchMovie = (e) => {
		e.preventDefault()
		getMovieData(title);
	}

	return ( 
		<Card className={classes.main} raised onClick={ switchMovie } >
		<CardMedia className={classes.poster} component="img" src={poster} />
		<span>
			{title && title.length > 9 ? `${title.trim().slice(0,9)}...` : title} 
		</span>
	</Card>)
};

const styles = theme => ({
	main: {
		margin: theme.spacing.unit,
		width: 75,
	},
	poster: {
		height: 100, // control consistency of poster sizes
	}
});

FavouritesPoster.propTypes = propTypes;

export default withStyles(styles)(FavouritesPoster);
