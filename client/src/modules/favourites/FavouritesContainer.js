import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import FavouritesPage from './FavouritesPage';
import { getFavourites } from '../favourites';
import { omdbPosterUrl, omdbUrl } from '../helpers'; // movie data

import {  } from '../helpers'; // movie posters
const propTypes = {
	currUser: PropTypes.instanceOf(Object).isRequired,
};

class FavouritesContainer extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			favourites: [1, 2, 3],
		}
	}

	componentDidMount() {
		const { currUser } = this.props;
		getFavourites(currUser.id)
			.then(resp => {
				let urls = resp.data.map(fav => {
					return (
						<a 
							key={fav.id} 
							href={`${omdbUrl}&t=${fav.favourited_id}`}
						>
							<img
								src={`${omdbPosterUrl}&i=${fav.favourited_id}`}
								alt="favorite movie poster"
								height="100"
							>
							</img>
						</a>
					)
				})

				return urls
			})
			.then(resp => this.setState({ favourites: resp }))
			.catch(err => console.log('Err: FavouritesContainer', err));
	}

	render() {
		return (
			// <FavouritesPage
			// 	favsArray={this.state.favourites}
			// />
			<div>
				{this.state.favourites}
			</div>
		)
	}
}


FavouritesContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
	currUser: state.users.currUser,
	currMovie: state.movies.currMovie,
});

export default connect(mapStateToProps)(FavouritesContainer)
