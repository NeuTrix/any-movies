// normalizr schema variables
import { movieSchema } from '../movies/redux';
import { normalize } from 'normalizr';

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
const normed1 = normalize(movieMock1, movieSchema);
const normed2 = normalize(movieMock2, movieSchema);

// export test variables

// gets id of the current movie
export const movie1 = normed1.result;
export const movie2 = normed2.result;
// get the detailed info of the current movie
export const details = normed1.entities.movies;
export const details2 = normed2.entities.movies;
