import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// custom

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	favID: PropTypes.string.isRequired, // id of current movie favourited object
	movie: PropTypes.instanceOf(Object).isRequired, // current movie
	status: PropTypes.bool.isRequired, // favourited status of current movie
	toggleFavourited: PropTypes.instanceOf(Function).isRequired, // add/remove fav
	user: PropTypes.number.isRequired, // current user
};

class FavouritesButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			favoured: false, // id of the favourite instance (not favouriteD)
		};
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle(e) {
		e.preventDefault();
		const { favID, movie, status, toggleFavourited, user } = this.props;
		const movieID = movie.imdbID;
		const userID = user.id;
		const update = new Promise(res => res()); // drive promise chain

		update.then(() => toggleFavourited({ favID, movieID, status, userID }))
			.then(() => this.setState({ favoured: status }));
	}

	render() {
		const { classes, status } = this.props;

		return (
			<IconButton
				size="large"
				onClick={this.handleToggle}
			>
				<FavouriteTwoTone
					className={classes.favourited}
					style={{ color: status ? 'orangered' : 'black' }}
				/>
			</IconButton>
		);
	}
}

const styles = theme => ({

	favourited: {
		alignItems: 'center',
		borderRadius: theme.shape.borderRadius,
		color: 'orangered',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		marginLeft: 0,
		position: 'absolute',
		width: '100%',
	},

	unfavourited: {
		alignItems: 'center',
		borderRadius: theme.shape.borderRadius,
		color: 'orangered',
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
