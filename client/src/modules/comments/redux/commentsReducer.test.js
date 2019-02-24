
import { expect } from 'chai';
import deepfreeze from 'deep-freeze';
import { normalize } from 'normalizr';

import {
	// action creators
	fetchCommentsFailure,
	fetchCommentsRequest,
	fetchCommentsSuccess,
	setCommentable,
	// normalizr schema variables
	comment, 
	commentsListSchema,
} from './commentsActions';

import commentsReducer, { initialState } from './commentsReducer';

// test objects
// export to a faker or factory helper file
const data1 = [
	{
		body: 'Something to test out',
		commentable_id: '100',
		commentable_type: 'Comment',
		id: '900',
		title: 'Test Comment',
		user_id: 'Well#1001',
	},
];
// normalized
const normed1 = normalize(data1, commentsListSchema);
const comments1 = normed1.result;
const dictionary1 = normed1.entities.comments;

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
const normed2 = normalize(data2, commentsListSchema);
const comments2 = normed2.result;
const dictionary2 = normed2.entities.comments;

// ensure an immutable previous state object for tests
const prevState = initialState;
deepfreeze(prevState);

describe('Comments reducer core actions', () => {
	it('...undefined action returns default previous state', () => {
		expect(commentsReducer(prevState)).to.eql(prevState);
	});
});

describe('The FETCH_COMMENTS_SUCCESS action', () => {
	const action = fetchCommentsSuccess(comments1, dictionary1);
	const nextState = commentsReducer(prevState, action);
	const action2 = fetchCommentsSuccess(comments2, dictionary2);
	const nextState2 = commentsReducer(nextState, action2);

	describe('The nextState properties', () => {
		it('--> nextState has `apiRequest` prop', () => {
			expect(nextState).to.have.property('apiRequest')
				.to.be.an('object');
		});

		it('--> nextState has a comments (array) prop', () => {
			expect(nextState).to.have.property('comments')
				.to.be.an('array');
		});

		it('...comments array has the correct value', () => {
			expect(nextState.comments[0]).to.eql(data1[0].id);
		});

		it('...comments array length incremented properly', () => {
			expect(prevState.comments.length).to.eql(0);
			expect(nextState.comments.length).to.eql(1);
		});

		it('--> nextState has a `commentable` prop', () => {
			expect(nextState).to.have.property('commentable')
				.to.be.an('string');
		});
	
		it('...nextState has `favourited` prop', () => {
			expect(nextState).to.have.property('favourited')
				.to.be.an('boolean');
		});

		it('...nextState has `showForm` prop', () => {
			expect(nextState).to.have.property('showForm')
				.to.be.an('boolean');
		});
	});

	describe('The apiRequest object', () => {
		it('... has an updated apiRequest.isFetching prop', () => {
			expect(nextState.apiRequest).to.have.property('isFetching')
				.to.eql(false);
		});

		it('... has an apiRequest.message prop', () => {
			expect(nextState.apiRequest).to.have.property('message');
		});

		it('... has an updated apiRequest.status', () => {
			expect(nextState.apiRequest).to.have.property('status')
				.to.eql('success');
		});
	});

	describe('The dictionary prop | sub reducer', () => {
		it('...has initial dictionary of length 0', () => {
			expect(Object.keys(prevState.dictionary).length).to.eql(0);
		});

		it('...has nextState 1 dictionary of length 1', () => {
			expect(Object.keys(nextState.dictionary).length).to.eql(1);
		});

		it('...has nextState 2 dictionary of length 3', () => {
			console.log(22, '==>', nextState2.dictionary);
			expect(Object.keys(nextState2.dictionary).length).to.eql(3);
		});
	});
});

describe('The FETCH_COMMENTS_REQUEST', () => {
	const action = fetchCommentsRequest();
	const nextState = commentsReducer(prevState, action);

	describe('... the apiRequest object', () => {
		it('... has an updated apiRequest.isFetching prop', () => {
			expect(nextState.apiRequest).to.have.property('isFetching')
				.to.eql(true);
		});

		it('... has an apiRequest.message prop', () => {
			expect(nextState.apiRequest).to.have.property('message');
		});

		it('... has an updated apiRequest.status', () => {
			expect(nextState.apiRequest).to.have.property('status')
				.to.eql('requesting');
		});
	});
});

describe('The FETCH_COMMENTS_FAILURE action', () => {
	const error = 'A mock error message';
	const action = fetchCommentsFailure(error);
	const nextState = commentsReducer(prevState, action);

	describe('... the apiRequest object', () => {
		it('... has an updated apiRequest.isFetching prop', () => {
			expect(nextState.apiRequest).to.have.property('isFetching')
				.to.eql(false);
		});

		it('... has an apiRequest.message prop', () => {
			expect(nextState.apiRequest).to.have.property('message');
		});

		it('... has an updated apiRequest.status', () => {
			expect(nextState.apiRequest).to.have.property('status')
				.to.eql('error');
		});
	});
});

describe.only('The SET_COMMENTABLE action', () => {
	const action = setCommentable(data1[0].id);
	const nextState = commentsReducer(prevState, action);
	console.log(99, '==>', nextState);

	it('...has an updated commentable prop', () => {
		expect(nextState).to.have.property('commentable')
			.to.be.an('string');
	});

	it('...has the expected value', () => {
		expect(nextState.commentable).to.eql(data1[0].id);
	});
});
