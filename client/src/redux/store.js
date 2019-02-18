import { applyMiddleware, combineReducers, createStore } from 'redux';
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
	comments: {
		comments: [],
		isFormDisplayed: false,
	},
	movies:{},
	// movies: {
	// 	isFavourited: false,
	// 	isMovieRegistered: false,
	// 	currMovie: {
	// 		imdbID: 'tt0078748',
	// 		Title: 'Alien',
	// 	},
	// 	requestToOmdbApi: {
	// 		isFetching: false,
	// 		status: 'pending',
	// 	},
	// },
	users: {
		currUser: {
			username: 'Mickey333',
			id: 1,
		},
	},

};

const store = createStore(
	reducers,
	defaultState,
	applyMiddleware(
		thunkMiddleware,
	),
);

store.subscribe(() => console.log('Current state ==> ',store.getState()))
// holding to hydrate default movie
store.dispatch(getMovie('Babe'))

export default store;
