
import deepfreeze from 'deep-freeze';
import { expect } from 'chai';

// action creators
import {
	addCommentToDictionary,
	fetchCommentsFailure,
	fetchCommentsRequest,
	fetchCommentsSuccess,
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

describe('The ADD_COMMENT_TO_DICTIONARY action', () => {
	const action = addCommentToDictionary(comments1, dictionary1);
	const nextState = commentsReducer(prevState, action);
	const action2 = addCommentToDictionary(comments2, dictionary2);
	const nextState2 = commentsReducer(nextState, action2);

	describe('The nextState properties', () => {
		it('--> nextState has `apiStatus` prop', () => {
			expect(nextState).to.have.property('apiStatus')
				.to.be.an('object');
		});

		it('...nextState has `favourited` prop', () => {
			expect(nextState).to.have.property('favourited')
				.to.be.an('boolean');
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

describe('The FETCH_COMMENTS_FAILURE action', () => {
	const error = 'A mock error message';
	const action = fetchCommentsFailure(error);
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

describe('The FETCH_COMMENTS_REQUEST', () => {
	const action = fetchCommentsRequest();
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

describe('The FETCH_COMMENTS_SUCCESS', () => {
	const action = fetchCommentsSuccess();
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
});
