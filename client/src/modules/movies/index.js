export { default as MoviePageContainer } from './MoviePageContainer';
export { default as MoviePage } from './MoviePage';
export { default as MovieSearchBar } from './MovieSearchBar';
export { default as MovieCommentsContainer } from './MovieCommentsContainer';
// redux exports
export { default as moviesReducer } from './redux/moviesReducer';
export { getMovieData } from './redux/moviesActions';
// constants from strings to ensure against typos
export { SET_CURRENT_MOVIE } from './redux/moviesConstants';
