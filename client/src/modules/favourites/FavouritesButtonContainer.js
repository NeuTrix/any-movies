import { connect } from 'react-redux';
import FavouritesButton from './FavouritesButton';
import { toggleFavourited } from '../favourites/redux/favouritesActions';

const mapStateToProps = (state, props) => ({
	favID: state.favourites.current,
	movie: state.movies.current, // current movie displayed
	status: state.favourites.status,
	user: state.users.current, // current user
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
