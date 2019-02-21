
import { expect } from 'chai';
import deepfreeze from 'deep-freeze';
import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	UPDATE_CURRENT_COMMENTS,
} from './commentsConstants';

import {
	fetchCommentsFailure,
	fetchCommentsRequest,
	fetchCommentsSuccess,
} from './commentsActions';

import commentsReducer, { initialState } from './commentsReducer';

// export to a faker or factory helper file
const data1 = [
	{
		id: 900,
		body: 'Something to test out',
		commentable_id: 100,
		commentable_type: 'Comment',
		title: 'Test Comment',
		user_id: 'Well#1001',
	},
];

const data2 = [
	{
		id: 1000,
		body: 'The next addition',
		commentable_id: 200,
		commentable_type: 'Comment',
		title: 'Test Comment',
		user_id: 'Well#1001',
	},
	{
		id: 800,
		body: 'Final test',
		commentable_id: 200,
		commentable_type: 'Comment',
		title: 'Test Comment',
		user_id: 'Well#1001',
	},
];
// ensure an immutable previous state object for tests
const prevState = initialState;
deepfreeze(prevState);

describe('Comments reducer core actions', () => {
	it('...undefined action returns default previous state', () => {
		expect(commentsReducer(prevState)).to.eql(prevState);
	});
});

describe('The FETCH_COMMENTS_SUCCESS action', () => {
	const action = fetchCommentsSuccess(data1);
	const nextState = commentsReducer(prevState, action);
	const action2 = fetchCommentsSuccess(data2);
	const nextState2 = commentsReducer(nextState, action2);

	it('... apiRequest.isFetching` to be `false`', () => {
		expect(nextState.apiRequest.isFetching).to.eql(false);
	});

	it('... apiRequest.status` to be `success`', () => {
		expect(nextState.apiRequest.status).to.eql('success');
	});

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

		it('--> nextState has a `current` prop', () => {
			expect(nextState).to.have.property('current')
				.to.be.an('object');
		});

		it('...nextState has `favourited` prop', () => {
			expect(nextState).to.have.property('favourited')
				.to.be.an('boolean');
		});

		it('...nextState has `showForm` prop', () => {
			expect(nextState).to.have.property('showForm')
				.to.be.an('boolean');
		});

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
					.to.eql('success');
			});
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
			expect(Object.keys(nextState2.dictionary).length).to.eql(3);
		});
	});
});

describe('=> FETCH_COMMENTS_REQUEST', () => {
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
