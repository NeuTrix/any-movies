import React from 'react';
import { Card, CardMedia, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	poster: PropTypes.instanceOf(String).isRequired,
};

const FavouritesPoster = ({ classes, poster }) => (
	<Card className={classes.main} raised>
		<CardMedia component='img' src={poster} />
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
