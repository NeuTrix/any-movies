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

const defaultState = {
  comments: {
    comments: [],
    isFormDisplayed: false,
  },
  movies: {
    isFavourited: false,
    isMovieRegistered: false,
    currMovie: {
      imdbID: 'tt0078748',
      Title: 'Alien',
    },
  },
  users: {  
    currUser: {
      username: 'Mickey333',
      id: 1,
    },
  }

}

const store = createStore(reducers, defaultState);

export default store;
