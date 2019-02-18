export { default as MoviePageContainer } from './MoviePageContainer';
export { default as MovieDisplay } from './MovieDisplay';
export { default as oldMoviePage } from './oldMoviePage';
export { default as MovieSearchBar } from './MovieSearchBar';
// redux exports
export { default as moviesReducer } from './redux/moviesReducer';
export { getMovie } from './redux/moviesActions';
// constants from strings to ensure against typos
export { UPDATE_CURRENT_MOVIE } from './redux/moviesConstants';
