
import deepfreeze from 'deep-freeze';
import { expect } from 'chai';

// action creators
import {
	addCommentToDictionary,
	getCommentsFailure,
	getCommentsRequest,
	getCommentsSuccess,
	setthisMovie,
	toggleCommentsForm,
} from './commentsActions';

// test objects
import {
	comments1,
	comments2,
	dictionary1,
	dictionary2,
} from '../../testHelpers';

import commentsReducer, { initialState } from './commentsReducer';

// ensure an immutable previous state object for tests
const prevState = initialState;
deepfreeze(prevState);
deepfreeze(initialState);

describe('Comments reducer default actions', () => {
	it('...undefined action returns default previous state', () => {
		expect(commentsReducer(prevState)).to.eql(prevState);
	});
});

describe('The default state properties', () => {
	it('... has a the expected number of default properties', () => {
		expect(Object.keys(initialState).length).to.eql(3);
	});

	it('...has a `apiStatus` property (object)', () => {
		expect(initialState).to.have.property('apiStatus')
			.to.be.a('object');
	});

	it('...has a `dictionary` property (object)', () => {
		expect(initialState).to.have.property('dictionary')
			.to.be.a('object');
	});

	it('...has a `favourited` property (object)', () => {
		expect(initialState).to.have.property('favourited')
			.to.be.a('boolean');
	});

});

describe('The GET_COMMENTS_FAILURE action', () => {
	const error = 'A mock error message';
	const action = getCommentsFailure(error);
	const nextState = commentsReducer(prevState, action);

	describe('... the apiStatus object', () => {
		it('... has an updated apiStatus.isFetching prop', () => {
			expect(nextState.apiStatus).to.have.property('isFetching')
				.to.eql(false);
		});

		it('... has an apiStatus.message prop', () => {
			expect(nextState.apiStatus).to.have.property('message');
		});

		it('... has an updated apiStatus.status', () => {
			expect(nextState.apiStatus).to.have.property('status')
				.to.eql('error');
		});
	});
});

describe('The GET_COMMENTS_REQUEST', () => {
	const action = getCommentsRequest();
	const nextState = commentsReducer(prevState, action);

	describe('... the apiStatus object', () => {
		it('... has an updated apiStatus.isFetching prop', () => {
			expect(nextState.apiStatus).to.have.property('isFetching')
				.to.eql(true);
		});

		it('... has an apiStatus.message prop', () => {
			expect(nextState.apiStatus).to.have.property('message');
		});

		it('... has an updated apiStatus.status', () => {
			expect(nextState.apiStatus).to.have.property('status')
				.to.eql('requesting');
		});
	});
});

describe('The GET_COMMENTS_SUCCESS', () => {
	const action = getCommentsSuccess();
	const nextState = commentsReducer(prevState, action);

	describe('The apiStatus object', () => {
		it('... has an updated apiStatus.isFetching prop', () => {
			expect(nextState.apiStatus).to.have.property('isFetching')
				.to.eql(false);
		});

		it('... has an apiStatus.message prop', () => {
			expect(nextState.apiStatus).to.have.property('message');
		});

		it('... has an updated apiStatus.status', () => {
			expect(nextState.apiStatus).to.have.property('status')
				.to.eql('success');
		});
	});

	describe('The DELETE_COMMENTS reducer action', () => {
		
	});
});
