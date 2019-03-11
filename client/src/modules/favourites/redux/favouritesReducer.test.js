
import deepfreeze from 'deep-freeze';
import { expect } from 'chai';

// action creators
import {
	addFavourite,
	getFavourites,
	removeFavourite,
	isFavourited,
} from './favouritesActions';

// test objects
import {
	movie1,
	movie2,
} from '../../testHelpers';

import favouritesReducer, { initialState } from './favouritesReducer';

// ensure an immutable previous state object for tests
const prevState = initialState;
deepfreeze(prevState);
deepfreeze(initialState);

describe('Favourites reducer default actions', () => {
	xit('...undefined action returns default previous state', () => {
		expect(favouritesReducer(prevState)).to.eql(prevState);
	});
});

describe('The default state properties', () => {
	xit('... has a the expected number of default properties', () => {
		expect(Object.keys(initialState).length).to.eql(3);
	});

	xit('...has a `apiStatus` property (object)', () => {
		expect(initialState).to.have.property('apiStatus')
			.to.be.a('object');
	});

	xit('...has a `dictionary` property (object)', () => {
		expect(initialState).to.have.property('dictionary')
			.to.be.a('object');
	});

	xit('...has a `favourited` property (object)', () => {
		expect(initialState).to.have.property('favourited')
			.to.be.a('boolean');
	});

});

describe('The GET_COMMENTS_FAILURE action', () => {
	const error = 'A mock error message';
	const action = getCommentsFailure(error);
	const nextState = favouritesReducer(prevState, action);

	describe('... the apiStatus object', () => {
		xit('... has an updated apiStatus.isFetching prop', () => {
			expect(nextState.apiStatus).to.have.property('isFetching')
				.to.eql(false);
		});

		xit('... has an apiStatus.message prop', () => {
			expect(nextState.apiStatus).to.have.property('message');
		});

		xit('... has an updated apiStatus.status', () => {
			expect(nextState.apiStatus).to.have.property('status')
				.to.eql('error');
		});
	});
});

describe('The GET_COMMENTS_REQUEST', () => {
	const action = getCommentsRequest();
	const nextState = favouritesReducer(prevState, action);

	describe('... the apiStatus object', () => {
		xit('... has an updated apiStatus.isFetching prop', () => {
			expect(nextState.apiStatus).to.have.property('isFetching')
				.to.eql(true);
		});

		xit('... has an apiStatus.message prop', () => {
			expect(nextState.apiStatus).to.have.property('message');
		});

		xit('... has an updated apiStatus.status', () => {
			expect(nextState.apiStatus).to.have.property('status')
				.to.eql('requesting');
		});
	});
});

describe('The GET_COMMENTS_SUCCESS', () => {
	const action = getCommentsSuccess();
	const nextState = favouritesReducer(prevState, action);

	describe('The apiStatus object', () => {
		xit('... has an updated apiStatus.isFetching prop', () => {
			expect(nextState.apiStatus).to.have.property('isFetching')
				.to.eql(false);
		});

		xit('... has an apiStatus.message prop', () => {
			expect(nextState.apiStatus).to.have.property('message');
		});

		xit('... has an updated apiStatus.status', () => {
			expect(nextState.apiStatus).to.have.property('status')
				.to.eql('success');
		});
	});

	describe('The DELETE_COMMENTS reducer action', () => {
		
	});
});
