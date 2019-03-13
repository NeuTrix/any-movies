import React from 'react';
import { Card, CardMedia, withStyles, CardHeader } from '@material-ui/core';
import PropTypes from 'prop-types';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	poster: PropTypes.instanceOf(String).isRequired,
	title: PropTypes.instanceOf(String).isRequired,
};

const FavouritesPoster = ({ classes, poster, title }) => (
	<Card className={classes.main} raised>
		<CardMedia component="img" src={poster} />
	<span>
	  {title.length > 9 ? title.trim().slice(0,9)+'...' : title} 
	</span>
	</Card>
);

const styles = theme => ({
	main: {
    margin: theme.spacing.unit,
    width: 75,
	}
});

FavouritesPoster.propTypes = propTypes;

export default withStyles(styles)(FavouritesPoster);
