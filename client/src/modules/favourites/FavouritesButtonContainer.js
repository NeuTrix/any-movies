import { connect } from 'react-redux';
import FavouritesButton from './FavouritesButton';
import { toggleFavourited } from '../favourites/redux/favouritesActions';

const mapStateToProps = (state, props) => ({
	favID: state.favourites.current,
	movieID: state.movies.current.imdbID, // current movie displayed
	status: state.favourites.status,
	userID: state.users.current.id, // current user
})

const mapDispatchToProps = (dispatch) => ({
	toggleFavourited: ({ favID, movieID, status, userID }) => {
		dispatch(toggleFavourited({ favID, movieID, status, userID }));
	}
})

const FavouritesButtonContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(FavouritesButton);

export default  FavouritesButtonContainer;
