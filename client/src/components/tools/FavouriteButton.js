import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { Button } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	addToFavourites: PropTypes.instanceOf(Function).isRequired,
	movieRegistered: PropTypes.instanceOf(Boolean).isRequired,
	toggleCommentableForm: PropTypes.instanceOf(Function).isRequired,
};

class FavouriteButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
		};
		this.onClick = this.onClick.bind(this);
	}


	onClick(e) {
		e.preventDefault();
		// close the form if open
		// if (isFormDisplayed) {
		// 	toggleCommentableForm();
		// }
		console.log('Got it!!')

	}

	render() {
		const { classes } = this.props;
		const { searchTerm } = this.state;

		return (
			<FavouriteTwoTone
				className={classes.favourite}
				onClick={this.onClick}
			/>
		)
	}
}

const styles = theme => ({

	favourite: {
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		alignItems: 'center',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		// position: 'absolute',
		// backgroundColor: fade(theme.palette.common.white, 0.15),
		color: 'orangered',
		borderRadius: theme.shape.borderRadius,
		marginLeft: 0,
		width: '100%',
	},
});

FavouriteButton.propTypes = propTypes;

export default withStyles(styles)(FavouriteButton);
