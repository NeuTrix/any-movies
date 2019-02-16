import { createStore } from 'redux';

const defaultState = {
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

const store = createStore((state = defaultState)) => {
  return state;
});