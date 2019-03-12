import { connect } from 'react-redux';
import FavouritesButton from './FavouritesButton';
import { toggleFavourited } from '../favourites/redux/favouritesActions';

const mapStateToProps = (state, props) => ({
	favID: state.favourites.current,
	movie: state.movies.current, // current movie displayed
	status: state.favourites.status,
	userID: state.users.current.id, // current user
})

const mapDispatchToProps = (dispatch) => ({
	toggleFavourited: ({ favID, movie, status, userID }) => {
		dispatch(toggleFavourited({ favID, movie, status, userID }));
	}
})

const FavouritesButtonContainer = connect(
	mapStateToProps, 
	mapDispatchToProps,
)(FavouritesButton);

export default  FavouritesButtonContainer;
