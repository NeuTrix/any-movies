import { combineReducers } from 'redux';
import { currMovieReducer } from '../modules/movies/redux';

const combinedReducers = combineReducers({
	currMovie: currMovieReducer,
});

export default combinedReducers;
