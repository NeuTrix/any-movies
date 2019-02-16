import React, { Component } from 'react';
import PropTypes from 'prop-types';
// material ui
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// custom
import {
	addFavourite,
	isFavourited,
	removeFavourite,
} from '../../actions/favouritesActions';

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	currMovie: PropTypes.instanceOf(Object).isRequired,
	currUserId: PropTypes.number.isRequired,
};

class FavouriteButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {},
			favoured: false, // id of the favourite instance (not favouriteD)
		};
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		const { currMovie, currUserId } = this.props;
		const	data = {
			favourited_id: currMovie.imdbID,
			favourited_title: currMovie.Title,
			favourited_type: "Movie",
			user_id: currUserId,
		};
		isFavourited(data)
			.then((resp) => {
				if (resp.data) {
					return this.setState({
						data,
						favoured: resp.data.exists, // set favoured status for the button
					});
				}
			})
			.catch(err => console.log('Err: isFavourited()/FavButton', err));
	}

	componentDidUpdate(prevProps) {
		const { currMovie, currUserId } = this.props;
		const data = {
			favourited_id: currMovie.imdbID,
			favourited_title: currMovie.Title,
			favourited_type: "Movie",
			user_id: currUserId,
		};

		if (prevProps.currMovie.imdbID !== currMovie.imdbID) {
			isFavourited(data)
				.then((resp) => {
					if (resp.data) {
						return this.setState({
							data,
							favoured: resp.data.exists, // set favoured status for the button
						});
					}
				})
				.catch(err => console.log('Err: isFavourited()/FavButton', err));
		}
	}

	onClick(e) {
		e.preventDefault();
		const { data, favoured } = this.state;
		// check to see if favourited in the api db
		isFavourited(data)
			.then((resp) => {
				if (favoured) {
					removeFavourite(data); // remove a favourited item
					this.setState({ favoured: false });
				} else {
					addFavourite(data); // add to the faves list
					this.setState({ favoured: true });
				}
			})
			.catch((err) => {
				console.log('FavouriteButton', err);
			});
	}

	render() {
		const { classes } = this.props;

		return (

			<IconButton
				size="large"
				onClick={this.onClick}
			>
				<FavouriteTwoTone
					className={classes.favourited}
					style={{ color: this.state.favoured ? 'orangered' : 'black' }}
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

FavouriteButton.propTypes = propTypes;

export default withStyles(styles)(FavouriteButton);
