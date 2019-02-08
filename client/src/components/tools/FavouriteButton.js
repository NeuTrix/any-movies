import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { IconButton } from '@material-ui/core';
// import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import {
	addFavouriteMovie,
	isMovieFavourited,
} from '../../helpers/favouriteActions';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	// consider taking an action as a prop e.g. addFavouriteMovie
	// would allow the button to function more purely or generically
	currMovie: PropTypes.instanceOf(Object).isRequired,
	currUser: PropTypes.instanceOf(Object).isRequired,
};

class FavouriteButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isFavourited: false,
		};
		this.onClick = this.onClick.bind(this);
	}

	componentDidUpdate(prevProps) {
		const { currMovie, currUser } = this.props;
		if (prevProps.currMovie.imdbID !== currMovie.imdbID ) {
			const data = { currMovie, currUser }

			this.setState({ isFavourited: isMovieFavourited(data) });
		}
	}

	onClick(e) {
		e.preventDefault();
		const { currMovie, currUser } = this.props
		addFavouriteMovie({ currMovie, currUser })
		this.setState({ isFavourited: isMovieFavourited({ currMovie, currUser })() });
		console.log('Got it!!')
	}

	render() {
		const { classes } = this.props;

		return (

			<IconButton 
				// disabled		
				size="large"
				onClick={this.onClick}
			>
				{/* <Typography variant="h1" > */}
					<FavouriteTwoTone 
						className={classes.favourited} 
						style={{ color: this.state.isFavourited ? 'orangered' : 'black' }}
					/>
				{/* </Typography> */}
			</IconButton>
		)
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

FavouriteButton.propTypes = propTypes;

export default withStyles(styles)(FavouriteButton);
