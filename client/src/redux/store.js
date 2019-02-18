import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'; // handle async actions
// import createLogger from 'redux-logger'
import { commentsReducer } from '../modules/comments';
import { favouritesReducer } from '../modules/favourites';
import { moviesReducer } from '../modules/movies';
import { usersReducer } from '../modules/users';
import { getMovie } from '../modules/movies/redux/moviesActions';

const reducers = combineReducers({
	comments: commentsReducer,
	favourites: favouritesReducer,
	movies: moviesReducer,
	users: usersReducer,
});

const defaultState = {
	users: {
		currUser: {
			username: 'Mickey333',
			id: 1,
		},
	},
};

// trigger Redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducers,
	defaultState,
	composeEnhancers(
		applyMiddleware(thunkMiddleware)
	)
);

// hydrate default movie
store.dispatch(getMovie('Babe'))

export default store;
