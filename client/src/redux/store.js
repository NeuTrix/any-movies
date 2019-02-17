import { combineReducers, createStore } from 'redux';
import { commentsReducer } from '../modules/comments';
import { favouritesReducer } from '../modules/favourites';
import { moviesReducer } from '../modules/movies';
import { usersReducer } from '../modules/users';

const reducers = combineReducers({
	comments: commentsReducer,
	favourites: favouritesReducer,
	movies: moviesReducer,
	users: usersReducer,
});

const store = createStore(reducers);

export default store;
