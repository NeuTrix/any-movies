import React from 'react';
import PropTypes from 'prop-types';
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	favID: PropTypes.string.isRequired, // id of current movie favourited object
	movie: PropTypes.instanceOf(Object).isRequired, // current movie
	registered: PropTypes.bool.isRequired, // registration status of current movie
	status: PropTypes.bool.isRequired, // favourited status of current movie
	userID: PropTypes.number.isRequired, // current user
	// functions
	registerMovie: PropTypes.instanceOf(Function).isRequired, // add/remove fav
	toggleFavourited: PropTypes.instanceOf(Function).isRequired, // add/remove fav
};

function FavouritesButton(props) {
	const { classes, favID, movie, registered, status, userID } = props; // vars
	const { registerMovie, toggleFavourited } = props; // functions

	const handleToggle = (e) => {
		e.preventDefault();
		const movieData = { imdb_id: movie.imdbID, title: movie.Title }; // for movie
		const favesData = { favID, movie, status, userID }; // for faves 

		const promise = new Promise(res => res());
		// register movie if needed
		if (!registered) {
			promise.then(() => (registerMovie(movieData)))
				.then(() => toggleFavourited(favesData));
		} else {
			toggleFavourited(favesData);
		}
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
