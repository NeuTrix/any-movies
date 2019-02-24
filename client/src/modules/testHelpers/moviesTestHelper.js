// normalizr schema variables
import { normalize } from 'normalizr';
import { movie } from '../movies/redux';

// test objects
// export to a faker or factory helper file
const movieMock1 = {
	imdbID: 'tt0078748',
	title: 'Alien',
};

const movieMock2 = {
	imdbID: 'tt0076759',
	title: 'Star Wars',
};

// normalized
const normed1 = normalize(movieMock1, movie);
const normed2 = normalize(movieMock2, movie);

// export test variables

// gets id of the current movie
export const current = normed1.result;
export const current2 = normed2.result;
// get the detailed info of the current movie
export const dictionary = normed1.entities.movies;
export const dictionary2 = normed2.entities.movies;
