import { connect } from 'react-redux';
import FavouritesButton from './FavouritesButton';

const mapStateToProps = (state, props) => ({
	movie: state.movies.current,
})

const mapDispatchToProp = (dispatch) => ({
	
})

const FavouritesButtonContainer = connect(
	mapStateToProps, 
	mapDispatchToProp
)(FavouritesButton);

export default  FavouritesButtonContainer;
