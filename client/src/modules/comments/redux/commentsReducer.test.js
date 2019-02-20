
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

const newCommentList = [{
	id: 900,
	body: 'Something to test out',
	commentable_id: 100,
	commentable_type: 'Comment',
	title: 'Test Comment',
	user_id: 'Well#1001',
}];

const commentableID = newCommentList.commentable_id;
const commentableType = newCommentList.commentable_type;

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
			const action = fetchCommentsRequest(commentableID, commentableType);
			const nextState = commentsReducer(prevState, action);

			it('... apiRequest.isFetching` to be `true`', () => {
				expect(nextState.apiRequest.isFetching).to.eql(true);
			});

			it('... apiRequest.status` to be `requesting`', () => {
				expect(nextState.apiRequest.status).to.eql('requesting');
			});
		});

		describe('=> FETCH_COMMENTS_SUCCESS', () => {
			const action = fetchCommentsSuccess(
				newCommentList, 
				newCommentList.commentable_id,
			);
			const nextState = commentsReducer(prevState, action);

			describe('The api actions...', () => {
				it('... apiRequest.isFetching` to be `false`', () => {
					expect(nextState.apiRequest.isFetching).to.eql(false);
				});

				it('... apiRequest.status` to be `success`', () => {
					expect(nextState.apiRequest.status).to.eql('success');
				});
			});

			describe('The next state properties', () => {
				it('...has a `dictionary` prop', () => {
					expect(nextState).to.have.property('dictionary')
						.to.be.an('object')
				});

				it('...updated the dictionary', () => {
					expect(nextState.dictionary[900].title).to.eql(newCommentList[0].title)
				});
				
				it('...dictionary was updated', () => {
					expect(Object.keys(prevState.dictionary).length).to.eql(0);
					expect(Object.keys(nextState.dictionary).length).to.eql(1);
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
