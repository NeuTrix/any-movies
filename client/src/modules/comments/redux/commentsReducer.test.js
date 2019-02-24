
import deepfreeze from 'deep-freeze';
import { expect } from 'chai';

// action creators
import {
	fetchCommentsFailure,
	fetchCommentsRequest,
	fetchCommentsSuccess,
	setCommentable,
} from './commentsActions';

// test objects
import {
	comments1,
	comments2,
	dictionary1,
	dictionary2,
} from './commentsTestHelper';

import commentsReducer, { initialState } from './commentsReducer';

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

		it('--> nextState has a subComments (array) prop', () => {
			expect(nextState).to.have.property('subComments')
				.to.be.an('array');
		});

		it('...subComments array has the correct value', () => {
			expect(nextState.subComments[0]).to.eql(comments1[0]);
		});

		it('...subComments array length incremented properly', () => {
			expect(prevState.subComments.length).to.eql(0);
			expect(nextState.subComments.length).to.eql(1);
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

describe('The SET_COMMENTABLE action', () => {
	const action = setCommentable(comments1[0]);
	const nextState = commentsReducer(prevState, action);

	it('...has an updated commentable prop', () => {
		expect(nextState).to.have.property('commentable')
			.to.be.an('string');
	});

	it('...has the expected value', () => {
		expect(nextState.commentable).to.eql(comments1[0]);
	});
});
