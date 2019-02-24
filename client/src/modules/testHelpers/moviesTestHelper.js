// normalizr schema variables
import { normalize } from 'normalizr';
import { commentsListSchema } from '../comments/redux';

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
const normed1 = normalize(data1, commentsListSchema);
const normed2 = normalize(data2, commentsListSchema);

// export test variables
export const comments1 = normed1.result;
export const dictionary1 = normed1.entities.comments;
export const comments2 = normed2.result;
export const dictionary2 = normed2.entities.comments;
