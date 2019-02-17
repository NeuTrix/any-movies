import { combineReducers, createStore } from 'redux';
import {movieReducer} from '../modules/movies/redux';
import commentsReducer from '../modules/comments/redux';
import favouritesReducer from '../modules/favourites';
// import { favouritesReducer } from '../modules/favourites';
import userReducer from '../modules/movies/redux';

const reducers = combineReducers({
  comments: commentsReducer,
	currMovie: movieReducer,
	favourites: favouritesReducer,
  user: userReducer,
});

const store = createStore(reducers); 

export default store;
