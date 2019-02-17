export { default as MovieContainer } from './MovieContainer';
export { default as MovieDisplay } from './MovieDisplay';
export { default as MoviePage } from './MoviePage';
export { default as MovieSearchBar } from './MovieSearchBar';
// redux exports
export { default as movieReducer } from './redux/movieReducer';
export { addMovie } from './redux/moviesActions';
// constants from strings to ensure against typos
export { UPDATE_MOVIE } from './redux/moviesConstants';
