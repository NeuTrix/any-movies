import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// custom
import { addFavourite, isFavourited, } from '../../actions/favouritesActions';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	currItemId: PropTypes.string.isRequired,
	currItemType: PropTypes.string.isRequired,
	currUserId: PropTypes.number.isRequired,
};

class FavouriteButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {},
			isFavourited: false,
		};
		this.onClick = this.onClick.bind(this);
	}

	// componentDidMount

	componentDidMount() {
	// componentDidUpdate(prevProps) {
		const { currItemId, currItemType, currUserId } = this.props;
		console.log('++++++>', currUserId)
		// if (prevProps.currItemId !== currItemId) {
			const	data = {
				favourited_id: currItemId,
				favourited_type: currItemType,
				user_id: currUserId,
			};

			this.setState({ data: data, isFavourited: isFavourited(data) });
		// }
	}

	onClick(e) {
		e.preventDefault();
		const { data } = this.state;
		// const { currItemId, currItemType, currUserId } = this.props;
		// addFavourite(data)
		// this.setState({ isFavourited: isFavourited(data) });
		console.log('Adding Favs button processing...', data)
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
