import { combineReducer } from 'redux';
import { currMovieReducer } from '../modules/movies/redux'

const combinedReducers = combineReducer({
  currMovie: currMovieReducer,
})

export default combinedReducers;