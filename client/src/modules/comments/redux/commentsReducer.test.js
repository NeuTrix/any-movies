
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

describe('It can increment the dictionary length', () => {
	const prevState = initialState;
	// deepfreeze // add to test for immutability
	deepfreeze(prevState);

	const action1 = fetchCommentsSuccess(data1);
	const nextState1 = commentsReducer(prevState, action1);

	const action2 = fetchCommentsSuccess(data2);
	const nextState2 = commentsReducer(nextState1, action2);

	it('...had initial dictionary of length 0', () => {
		const pskeys = Object.keys(prevState.dictionary);
		expect(pskeys.length).to.eql(0);
	});

	it('...has nextState 1 dictionary of length 1', () => {
		const n1keys = Object.keys(nextState1.dictionary);
		expect(n1keys.length).to.eql(1);
	});

	it('...has nextState 2 dictionary of length 3', () => {
		const n2keys = Object.keys(nextState2.dictionary);
		expect(n2keys.length).to.eql(3);
	});
});

// xdescribe('The Comments Reducer', () => {
// 	let prevState; // initial previous state object for testing
// 	let dictionary; // the reducer target object

// 	beforeEach(() => {
// 		// previous state
// 		prevState = initialState;
// 		// deepfreeze // add to test for immutability
// 		deepfreeze(prevState);
// 		dictionary = prevState.dictionary;
// 	});

// 	describe('Comments reducer core actions', () => {
// 		it('...undefined action returns default previous state', () => {
// 			expect(commentsReducer(prevState)).to.eql(prevState);
// 		});


// 	});

// 	describe('Comments Reducer Async Actions', () => {

// 		describe('=> FETCH_COMMENTS_REQUEST', () => {
// 			const action = fetchCommentsRequest();
// 			const nextState = commentsReducer(prevState, action);

// 			it('... apiRequest.isFetching` to be `true`', () => {
// 				expect(nextState.apiRequest.isFetching).to.eql(true);
// 			});

// 			it('... apiRequest.status` to be `requesting`', () => {
// 				expect(nextState.apiRequest.status).to.eql('requesting');
// 			});
// 		});

// 		describe('=> FETCH_COMMENTS_SUCCESS', () => {
// 			const action = fetchCommentsSuccess(
// 				data1,
// 				data1.commentable_id,
// 			);
// 			const nextState = commentsReducer(prevState, action);

// 			describe('The api actions...', () => {
// 				it('... apiRequest.isFetching` to be `false`', () => {
// 					expect(nextState.apiRequest.isFetching).to.eql(false);
// 				});

// 				it('... apiRequest.status` to be `success`', () => {
// 					expect(nextState.apiRequest.status).to.eql('success');
// 				});
// 			});

// 			describe('The nextState properties', () => {
// 				it('...has a `dictionary` prop', () => {
// 					expect(nextState).to.have.property('dictionary')
// 						.to.be.an('object')
// 				});

// 				it('...updated the dictionary contents', () => {
// 					expect(nextState.dictionary[900].title).to.eql(data1[0].title)
// 					expect(Object.keys(prevState.dictionary).length).to.eql(0);
// 					expect(Object.keys(nextState.dictionary).length).to.eql(2);
// 				});

// 				it('...has a `commentableComments` prop', () => {
// 					expect(nextState).to.have.property('commentableComments')
// 						.to.be.an('array');
// 				});

// 				it('...commentableComments was updated', () => {
// 					expect(prevState.commentableComments.length).to.eql(0);
// 					expect(nextState.commentableComments.length).to.eql(1);
// 				});

// 				it('... nextState to have `apiRequest` prop', () => {
// 					expect(nextState).to.have.property('apiRequest')
// 						.to.be.an('object')
// 				});
// 			});
// 		});

// 		xdescribe('=> FETCH_COMMENTS_FAILURE', () => {
// 			const error = 'A mock error message';
// 			const action = fetchCommentsFailure(error);
// 			const nextState = commentsReducer(prevState, action);

// 			xit('... apiRequest.isFetching` to be`false`', () => {
// 				expect(nextState.apiRequest.isFetching).to.eql(false);
// 			});

// 			xit('... apiRequest.status` to be`error`', () => {
// 				expect(nextState.apiRequest.status).to.eql('error');
// 			});

// 			xit('...updates the isFetching message with error data', () => {
// 				expect(nextState.apiRequest.message).to.eql(error);
// 			});
// 		});
// 	});
// });
