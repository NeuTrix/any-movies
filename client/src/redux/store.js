import {
 applyMiddleware, 
 combineReducers, 
 compose, 
 createStore 
} from 'redux';

import thunkMiddleware from 'redux-thunk'; // handle async actions
// import createLogger from 'redux-logger'
import { commentsReducer } from '../modules/comments';
import { favouritesReducer } from '../modules/favourites';
import { getMovieData } from '../modules/movies/redux/moviesActions';
import { moviesReducer } from '../modules/movies';
import { usersReducer } from '../modules/users';

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

const middlewares = [thunkMiddleware];

// only adds redux-logger outside of Production Environment
if (process.env.NODE_ENV === 'development') {
	const { logger } = require('redux-logger');
	middlewares.push(logger);
}

const store = createStore(
	reducers,
	defaultState,
	composeEnhancers(applyMiddleware(...middlewares)),
);

// hydrate default movie
store.dispatch(getMovieData('Alien'));

export default store;
