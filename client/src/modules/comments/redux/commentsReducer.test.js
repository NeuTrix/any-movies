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
			isFavourited: false, // change name to isMovieFavourited...
			requestToApi: {
				isFetching: false,
				message: '',
				status: '',
			},
			showCommentsForm: false,
		};

		deepfreeze(prevState);
	});

	describe('=> FETCH_COMMENTS_REQUEST', () => {
		const movieTitle = 'Babe';
		const action = fetchCommentsRequest(movieTitle);
		const nextState = commentsReducer(prevState, action);

		it('... requestToApi.isFetching` to be `true`', () => {
			expect(nextState.requestToApi.isFetching).to.eql(true);
		});

		it('... requestToApi.status` to be `requesting`', () => {
			expect(nextState.requestToApi.status).to.eql('requesting');
		});

		it('... prevState had a `currComments` prop', () => {
			expect(prevState).to.have.property('currComments');
		});

		it('... nextState to have `currComments` prop', () => {
			expect(nextState).to.have.property('currComments');
		});
	});

	describe('=> FETCH_COMMENTS_SUCCESS', () => {
		const action = fetchCommentsSuccess(comment);
		const nextState = commentsReducer(prevState, action);

		it('... requestToApi.isFetching` to be `false`', () => {
			expect(nextState.requestToApi.isFetching).to.eql(false);
		});

		it('... requestToApi.status` to be `success`', () => {
			expect(nextState.requestToApi.status).to.eql('success');
		});

		it('...updates the currComments object', () => {
			expect(nextState.currComments).to.eql(comment);
		});
	});

	describe('=> FETCH_COMMENTS_FAILURE', () => {
		const error = 'A mock error message';
		const action = fetchCommentsFailure(error);
		const nextState = commentsReducer(prevState, action);

		it('... requestToApi.isFetching` to be`false`', () => {
			expect(nextState.requestToApi.isFetching).to.eql(false);
		});

		it('... requestToApi.status` to be`error`', () => {
			expect(nextState.requestToApi.status).to.eql('error');
		});

		it('...updates the isFetching message with error data', () => {
			expect(nextState.requestToApi.message).to.eql(error);
		});
	});
});
