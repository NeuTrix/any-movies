import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import FavouritesPage from './FavouritesPage';
import { getFavourites } from '../../actions/favouritesActions';
import { omdb_url } from '../../helpers/api.helper';

const propTypes = {
	currUser: PropTypes.instanceOf(Object).isRequired,
};

class FavouritesContainer extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			favourites: [{
				id: 'null',
				favourited_id: 'tt0078748',
			}],
		}
	}

	componentDidMount() {
		const { currUser } = this.props;
		getFavourites(currUser.id)
			.then(resp => {
				let urls = resp.data
				console.log('xxxx=>', urls)


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
			<div>Howdy</div>
		)
	}
}


FavouritesContainer.propTypes = propTypes;

export default FavouritesContainer;
