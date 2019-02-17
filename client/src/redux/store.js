import { combineReducers, createStore } from 'redux';
import { commentsReducer } from '../modules/comments';
import { movieReducer } from '../modules/movies';
import { favouritesReducer } from '../modules/favourites';
import userReducer from '../modules/movies/redux';

const reducers = combineReducers({
  comments: commentsReducer,
	currMovie: movieReducer,
	favourites: favouritesReducer,
  currUser: userReducer,
});

const store = createStore(reducers); 

export default store;
