import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { Button, IconButton, Typography } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import {
	addFavouriteMovie,
	isMovieFavourited,
} from '../../helpers/favouritesFunctions';


const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	curr_movie: PropTypes.instanceOf(Object).isRequired,
	curr_user: PropTypes.instanceOf(Object).isRequired,
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
		const { curr_movie, curr_user } = this.props;
		if (prevProps.curr_movie.imdbID !== curr_movie.imdbID ) {
			const data = { curr_movie, curr_user }

			this.setState({ isFavourited: isMovieFavourited(data) });
		}
	}

	onClick(e) {
		e.preventDefault();
		const { curr_movie, curr_user } = this.props
			addFavouriteMovie({ curr_movie, curr_user
			})
			this.setState({ isFavourited: isMovieFavourited({ curr_movie, curr_user }) });
		
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
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		position: 'absolute',
		color: 'orangered',
		borderRadius: theme.shape.borderRadius,
		marginLeft: 0,
		width: '100%',
	},

	unfavourited: {
		alignItems: 'center',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		position: 'absolute',
		color: 'orangered',
		borderRadius: theme.shape.borderRadius,
		marginLeft: 0,
		width: '100%',
	},
	

});

FavouriteButton.propTypes = propTypes;

export default withStyles(styles)(FavouriteButton);
