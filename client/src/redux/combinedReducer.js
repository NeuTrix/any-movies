import { combineReducers } from 'redux';
import { currMovieReducer } from '../modules/movies/redux';

const combinedReducers = combineReducers({
	currMovie: currMovieReducer,
	// favourites: favouritesReducer,
	// user: userReducer,
});

export default combinedReducers;
