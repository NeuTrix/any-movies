import { expect } from 'chai';
import deepfreeze from 'deep-freeze';

import {
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_SUCCESS,
	UPDATE_CURRENT_COMMENTS,
} from './commentsConstants';

import {
	fetchCommentsRequest,
	fetchCommentsSuccess,
	fetchCommentsFailure,
} from './commentsActions';

import commentsReducer from './commentsReducer';

const comment = {
	body: '',
	commentable_id: '',
	commentable_type: '',
	title: '',
	user_id: '',
};

describe('The Comments Reducer', () => {
	let prevState; // initial prevState object for testing

	beforeEach(() => {
		prevState = { };
		// deepfreeze // add to test for immutability
		deepfreeze(prevState);
	});

	it('...undefined action returns default prevState', () => {
		expect(commentsReducer(prevState)).to.eql(prevState);
	});
});

describe('Comments Reducer Async Actions', () => {
	let prevState;

	beforeEach(() => {
		prevState = {
			currComments: [],
			requestToApi: {
				isFetching: false,
				message: '',
				status: 'pending',
			},
		};

		deepfreeze(prevState);
	});

	describe('=> FETCH_COMMENTS_REQUEST', () => {
		const movieTitle = 'Babe';
		const action = fetchCommentsRequest(movieTitle);
		const newState = commentsReducer(prevState, action);

		xit('... set.isFetching` to be `true`', () => {
			expect(newSta.isFetching).to.eql(true);
		});

		xit('... set.status` to be `requesting`', () => {
			expect(newSta.status).to.eql('requesting');
		});

		xit('... prevState had a `currComments` prop', () => {
			expect(prevState).to.have.property('currComments')
		});

		xit('... newState to have `currComments` prop', () => {
			expect(newState).to.have.property('currComments')
		});
	});

	describe('=> FETCH_COMMENTS_SUCCESS', () => {
		const action = fetchCommentsSuccess(comment);
		const newState = commentsReducer(prevState, action);

		xit('... set.isFetching` to be `false`', () => {
			expect(newSta.isFetching).to.eql(false);
		});

		xit('... set.status` to be `success`', () => {
			expect(newSta.status).to.eql('success');
		});

		xit('...updates the currComments object', () => {
			expect(newState.currComments).to.eql(comment)
		});
	});

	describe('=> FETCH_COMMENTS_FAILURE', () => {
		const error = 'A mock error message';
		const action = fetchCommentsFailure(error);
		const newState = commentsReducer(prevState, action);

		xit('... set.isFetching` to be`false`', () => {
			expect(newSta.isFetching).to.eql(false);
		});

		xit('... set.status` to be`error`', () => {
			expect(newSta.status).to.eql('error');
		});

		xit('...updates the isFetching message with error data', () => {
			expect(newSta.message).to.eql(error);
		});
	});

});
