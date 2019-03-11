import { connect } from 'react-redux';
import FavouritesButton from './FavouritesButton';

const mapStateToProps = (state, props) => ({
	movie: state.movies.current, // current movie displayed
	user: state.users.current, // current user 
})

const mapDispatchToProp = (dispatch) => ({

})

const FavouritesButtonContainer = connect(
	mapStateToProps, 
	mapDispatchToProp
)(FavouritesButton);

export default  FavouritesButtonContainer;
