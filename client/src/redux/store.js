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
import { getComments } from '../modules/comments/redux/commentsActions';
import { getMovieData } from '../modules/movies/redux/moviesActions';
import { moviesReducer } from '../modules/movies';
import { usersReducer } from '../modules/users';

const reducers = combineReducers({
	comments: commentsReducer,
	// dictionaries: dictionaries.Reducer,
	favourites: favouritesReducer,dd
	movies: moviesReducer,
	users: usersReducer,
	// myname: { first:'Michael', last: 'Walker'},
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
	composeEnhancers(applyMiddleware(thunkMiddleware)),
);

// hydrate default movie
store.dispatch(getMovieData('Alien'));
store.dispatch(getComments('tt0078748','Movie'));
store.dispatch(getComments('tt0076759', 'Movie'));

export default store;
