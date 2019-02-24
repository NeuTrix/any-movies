// normalizr schema variables
import { normalize } from 'normalizr';
import { moviesListSchema } from '../movies/redux';

// test objects
// export to a faker or factory helper file
// const movie1 = [{
// 		title: 'Alien',
// 		imdb_id: 'tt0078748'
// }];

// const movie2 = [
// 	{ title: 'Star Wars',
// 			imdb_id: 'tt0076759'
// 	}
// ];

// normalized
const normed1 = normalize(data1, moviesListSchema);
const normed2 = normalize(data2, moviesListSchema);

// export test variables
export const movies1 = normed1.result;
export const dictionary1 = normed1.entities.movies;
export const movies2 = normed2.result;
export const dictionary2 = normed2.entities.movies;
