import React from 'react';
import PropTypes from 'prop-types';
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	favID: PropTypes.string.isRequired, // id of current movie favourited object
	movie: PropTypes.instanceOf(Object).isRequired, // current movie
	status: PropTypes.bool.isRequired, // favourited status of current movie
	toggleFavourited: PropTypes.instanceOf(Function).isRequired, // add/remove fav
	userID: PropTypes.number.isRequired, // current user
};

function FavouritesButton(props) {
	const { classes, favID, movie, status, toggleFavourited, userID } = props;

	const handleToggle = (e) => {
		e.preventDefault();
		toggleFavourited({ favID, movie, status, userID });
	};

	return (
		<IconButton size="large" onClick={handleToggle}>
			<FavouriteTwoTone
				className={classes.heart}
				style={{ color: status ? 'orangered' : 'black' }}
			/>
		</IconButton>
	);
}

const styles = theme => ({
	heart: {
		alignItems: 'center',
		borderRadius: theme.shape.borderRadius,
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		marginLeft: 0,
		position: 'absolute',
		width: '100%',
	},
});

FavouritesButton.propTypes = propTypes;

export default withStyles(styles)(FavouritesButton);
