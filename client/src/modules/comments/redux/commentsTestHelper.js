// normalizr schema variables
import { normalize } from 'normalizr';
import { commentsListSchema } from './commentsActions';

// test objects
// export to a faker or factory helper file
const data1 = [{
	body: 'Something to test out',
	commentable_id: '100',
	commentable_type: 'Comment',
	id: '900',
	title: 'Test Comment',
	user_id: 'Well#1001',
}];

const data2 = [
	{
		body: 'The next addition',
		commentable_id: '200',
		commentable_type: 'Comment',
		id: '1000',
		title: 'Test Comment',
		user_id: 'Well#1001',
	},
	{
		body: 'Final test',
		commentable_id: '200',
		commentable_type: 'Comment',
		id: '800',
		title: 'Test Comment',
		user_id: 'Well#1001',
	},
];

// normalized
const normed1 = normalize(data1, commentsListSchema);
const normed2 = normalize(data2, commentsListSchema);

// export test variables
export const comments1 = normed1.result;
export const dictionary1 = normed1.entities.comments;
export const comments2 = normed2.result;
export const dictionary2 = normed2.entities.comments;
