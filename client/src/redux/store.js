import { createStore } from 'redux';
import combinedReducer from './combinedReducer';

export const initialState = {
  favourites: {},
  user: { 
    username: "mickey333",
    id: 2,
  },
  currMovie: {
    title: 'Alien',
    imdb_id: 'tt0078748',
  },
}

const store = createStore(combinedReducer) 

store.getState(initialState);

export default store;
