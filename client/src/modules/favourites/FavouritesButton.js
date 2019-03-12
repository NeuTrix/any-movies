import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FavouriteTwoTone from '@material-ui/icons/FavoriteTwoTone';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// custom

const propTypes = {
	classes: PropTypes.instanceOf(Object).isRequired,
	isFavourited: PropTypes.instanceOf(Function).isRequired, // from container
	movie: PropTypes.instanceOf(Object).isRequired,
	user: PropTypes.number.isRequired,
};

class FavouritesButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {},
			favoured: false, // id of the favourite instance (not favouriteD)
		};
		this.onClick = this.onClick.bind(this);
	}

	// componentDidMount() {
	// 	const { movie, user } = this.props;
	// 	const	data = {
	// 		favourited_id: movie.imdbID,
	// 		favourited_title: movie.Title,
	// 		favourited_type: "Movie",
	// 		user_id: user,
	// 	};
	// 	isFavourited(data)
	// 		.then((resp) => {
	// 			if (resp.data) {
	// 				return this.setState({
	// 					data,
	// 					favoured: resp.data.exists, // set favoured status for the button
	// 				});
	// 			}
	// 		})
	// 		.catch(err => console.log('Err: isFavourited()/FavButton', err));
	// }

	// componentDidUpdate(prevProps) {
	// 	const { movie, user } = this.props;
	// 	const data = {
	// 		favourited_id: movie.imdbID,
	// 		favourited_title: movie.Title,
	// 		favourited_type: "Movie",
	// 		user_id: user,
	// 	};

	// 	if (prevProps.movie.imdbID !== movie.imdbID) {
	// 		isFavourited(data)
	// 			.then((resp) => {
	// 				if (resp.data) {
	// 					return this.setState({
	// 						data,
	// 						favoured: resp.data.exists, // set favoured status for the button
	// 					});
	// 				}
	// 			})
	// 			.catch(err => console.log('Err: isFavourited()/FavButton', err));
	// 	}
	// }

	onClick(e) {

		e.preventDefault();
		const { isFavourited, movie, user } = this.props;
		alert('hello')
		// check to see if favourited in the api db
		// isFavourited({ userID: user.id, movieID: movie.imdbID });
			// .then((resp) => {
			// 	if (favoured) {
			// 		removeFavourite(data); // remove a favourited item
			// 		this.setState({ favoured: false });
			// 	} else {
			// 		addFavourite(data); // add to the faves list
			// 		this.setState({ favoured: true });
			// 	}
			// })
			// .then(resp => {console.log(777, '==>', resp)})
			// .catch((err) => {
			// 	console.log('FavouritesButton', err);
			// });
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

FavouritesButton.propTypes = propTypes;

export default withStyles(styles)(FavouritesButton);
