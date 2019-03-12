import { connect } from 'react-redux';
import FavouritesButton from './FavouritesButton';
import { isFavourited } from '../favourites/redux/favouritesActions';

const mapStateToProps = (state, props) => ({
	movie: state.movies.current, // current movie displayed
	user: state.users.current, // current user
})

const mapDispatchToProp = (dispatch) => ({
	isFavourited: ({userID, movieID}) => { dispatch(isFavourited({userID, movieID})) },
	// toggleFavourited: ({ favID, movID, status }) => {
		// dispatch(toggleFavourited({ favID, movID, status }))
	// }
})

const FavouritesButtonContainer = connect(
	mapStateToProps, 
	mapDispatchToProp
)(FavouritesButton);

export default  FavouritesButtonContainer;
