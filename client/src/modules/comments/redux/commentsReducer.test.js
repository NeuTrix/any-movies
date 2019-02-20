
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

import { expect } from 'chai';
import deepfreeze from 'deep-freeze';
import commentsReducer, { initialState } from './commentsReducer';

const commentable = {
	body: '',
	commentable_id: '',
	commentable_type: '',
	title: '',
	user_id: '',
};

const commentableID = commentable.commentable_id;
const commentableType = commentable.commentable_type;

describe('The Comments Reducer', () => {
	let prevState; // initial previous state object for testing
	let dictionary; // the reducer target object

	beforeEach(() => {
		// previous state
		prevState = initialState;
		// deepfreeze // add to test for immutability
		deepfreeze(prevState);
		dictionary = prevState.dictionary;
	});

	describe('Comments reducer core actions', () => {
		it('...undefined action returns default previous state', () => {
			expect(commentsReducer(prevState)).to.eql(prevState);
		});
	});

	describe('Comments Reducer Async Actions', () => {

		describe('=> FETCH_COMMENTS_REQUEST', () => {
			let action = fetchCommentsRequest(commentableID, commentableType);
			let nextState = commentsReducer(prevState, action);

			it('... api does not update if no valid action given', () => {
				action = '';
				let	nextState = commentsReducer(prevState, action);
				expect(nextState.apiRequest.isFetching).to.eql(false);
			});

			it('... apiRequest.isFetching` to be `true`', () => {
				console.log(nextState.apiRequest.isFetching)
				expect(nextState.apiRequest.isFetching).to.eql(true);
			});

			it('... apiRequest.status` to be `requesting`', () => {
				expect(nextState.apiRequest.status).to.eql('requesting');
			});
		});

		describe('=> FETCH_COMMENTS_SUCCESS', () => {
			const action = fetchCommentsSuccess(commentable);
			const nextState = commentsReducer(prevState, action);

			xdescribe('The api actions...', () => {
				xit('... apiRequest.isFetching` to be `false`', () => {
					expect(nextState.apiRequest.isFetching).to.eql(false);
				});

				xit('... apiRequest.status` to be `success`', () => {
					expect(nextState.apiRequest.status).to.eql('success');
				});

				xit('...updates the currComments object', () => {
					expect(nextState.currComments).to.eql(commentable);
				});
			});

			xdescribe('The next state properties', () => {
				xit('... previous state had a `currComments` prop', () => {
					expect(prevState).to.have.property('currComments');
				});

				xit('... ', () => {});

				xit('... nextState to have `currComments` prop', () => {
					expect(nextState).to.have.property('currComments');
				});
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
	});
});
