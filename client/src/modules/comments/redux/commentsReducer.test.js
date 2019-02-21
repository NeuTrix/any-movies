
import { expect } from 'chai';
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

import deepfreeze from 'deep-freeze';
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

	describe('The dictionary sub reducer', () => {
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

	it('... apiRequest.isFetching` to be `true`', () => {
		expect(nextState.apiRequest.isFetching).to.eql(true);
	});

	it('... apiRequest.status` to be `requesting`', () => {
		expect(nextState.apiRequest.status).to.eql('requesting');
	});
});


xdescribe('The nextState properties', () => {
	it('...has a `dictionary` prop', () => {
		expect(nextState).to.have.property('dictionary')
			.to.be.an('object')
	});

	it('...updated the dictionary contents', () => {
		expect(nextState.dictionary[900].title).to.eql(data1[0].title)
		expect(Object.keys(prevState.dictionary).length).to.eql(0);
		expect(Object.keys(nextState.dictionary).length).to.eql(2);
	});

	it('...has a `commentableComments` prop', () => {
		expect(nextState).to.have.property('commentableComments')
			.to.be.an('array');
	});

	it('...commentableComments was updated', () => {
		expect(prevState.commentableComments.length).to.eql(0);
		expect(nextState.commentableComments.length).to.eql(1);
	});

	it('... nextState to have `apiRequest` prop', () => {
		expect(nextState).to.have.property('apiRequest')
			.to.be.an('object')
	});
});

xdescribe('=> FETCH_COMMENTS_FAILURE', () => {
	const error = 'A mock error message';
	const action = fetchCommentsFailure(error);
	const nextState = commentsReducer(prevState, action);

	xit('... apiRequest.isFetching` to be`false`', () => {
		expect(nextState.apiRequest.isFetching).to.eql(false);
	});

	xit('... apiRequest.status` to be`error`', () => {
		expect(nextState.apiRequest.status).to.eql('error');
	});

	xit('...updates the isFetching message with error data', () => {
		expect(nextState.apiRequest.message).to.eql(error);
	});
});
