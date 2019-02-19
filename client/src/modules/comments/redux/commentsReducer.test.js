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

import commentsReducer from './commentsReducer';

const commentable = {
	body: '',
	commentable_id: '',
	commentable_type: '',
	title: '',
	user_id: '',
};

describe('The Comments Reducer', () => {
	let prevState; // initial previous state object for testing
	let comments; // the reducer target object

	beforeEach(() => {
		// previous state
		prevState = {
			comments: {
				dictionary: [],
				commentable: [],
				isFavourited: false, // change name to isMovieFavourited...
				apiRequest: {
					isFetching: false,
					message: '',
					status: '',
				},
				showCommentsForm: false,
			},
		};
		// deepfreeze // add to test for immutability
		deepfreeze(prevState);
		comments = prevState.comments;
	});

	describe.only('Comments reducer core actions', () => {
		it('...undefined action returns default previous state', () => {
			console.log(comments);
			expect(commentsReducer(comments)).to.eql(comments);
		});
	});


	xdescribe('Comments Reducer Async Actions', () => {
		xdescribe('=> FETCH_COMMENTS_REQUEST', () => {
			const movieTitle = 'Babe';
			const action = fetchCommentsRequest(movieTitle);
			const nextState = commentsReducer(comments, action);

			xit('... apiRequest.isFetching` to be `true`', () => {
				expect(nextState.apiRequest.isFetching).to.eql(true);
			});

			xit('... apiRequest.status` to be `requesting`', () => {
				expect(nextState.apiRequest.status).to.eql('requesting');
			});
		});

		xdescribe('=> FETCH_COMMENTS_SUCCESS', () => {
			const action = fetchCommentsSuccess(commentable);
			const nextState = commentsReducer(comments, action);

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
					expect(comments).to.have.property('currComments');
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
			const nextState = commentsReducer(comments, action);

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
