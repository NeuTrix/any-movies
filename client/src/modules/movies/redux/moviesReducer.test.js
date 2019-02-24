
import deepfreeze from 'deep-freeze';
import { expect } from 'chai';

// action creators
import {
	fetchMoviesFailure,
	fetchMoviesRequest,
	fetchMoviesSuccess,
} from './moviesActions';

// test objects
import {
	movie1,
	movie2,
	details,
	details2,
} from '../../testHelpers';

import moviesReducer, { initialState } from './moviesReducer';

// ensure an immutable previous state object for tests
const prevState = initialState;
deepfreeze(prevState);

describe('Movies reducer core actions', () => {
	it('...undefined action returns default previous state', () => {
		expect(moviesReducer(prevState)).to.eql(prevState);
	});
});

xdescribe('The FETCH_MOVIES_SUCCESS action', () => {
	const action = fetchMoviesSuccess(movie1, dictionary1);
	const nextState = moviesReducer(prevState, action);
	const action2 = fetchMoviesSuccess(movie2, dictionary2);
	const nextState2 = moviesReducer(nextState, action2);

	describe('The nextState properties', () => {
		xit('--> nextState has `apiRequest` prop', () => {
			expect(nextState).to.have.property('apiRequest')
				.to.be.an('object');
		});

		xit('--> nextState has a subMovies (array) prop', () => {
			expect(nextState).to.have.property('subMovies')
				.to.be.an('array');
		});

		xit('...subMovies array has the correct value', () => {
			expect(nextState.subMovies[0]).to.eql(movie1[0]);
		});

		xit('...subMovies array length incremented properly', () => {
			expect(prevState.subMovies.length).to.eql(0);
			expect(nextState.subComments.length).to.eql(1);
		});

		xit('--> nextState has a `commentable` prop', () => {
			expect(nextState).to.have.property('commentable')
				.to.be.an('string');
		});

		xit('...nextState has `favourxited` prop', () => {
			expect(nextState).to.have.property('favourxited')
				.to.be.an('boolean');
		});

		xit('...nextState has `showForm` prop', () => {
			expect(nextState).to.have.property('showForm')
				.to.be.an('boolean');
		});
	});

	xdescribe('The apiRequest object', () => {
		xit('... has an updated apiRequest.isFetching prop', () => {
			expect(nextState.apiRequest).to.have.property('isFetching')
				.to.eql(false);
		});

		xit('... has an apiRequest.message prop', () => {
			expect(nextState.apiRequest).to.have.property('message');
		});

		xit('... has an updated apiRequest.status', () => {
			expect(nextState.apiRequest).to.have.property('status')
				.to.eql('success');
		});
	});

	xdescribe('The dictionary prop | sub reducer', () => {
		xit('...has inxitial dictionary of length 0', () => {
			expect(Object.keys(prevState.dictionary).length).to.eql(0);
		});

		xit('...has nextState 1 dictionary of length 1', () => {
			expect(Object.keys(nextState.dictionary).length).to.eql(1);
		});

		xit('...has nextState 2 dictionary of length 3', () => {
			expect(Object.keys(nextState2.dictionary).length).to.eql(3);
		});
	});
});

xdescribe('The FETCH_MOVIES_REQUEST', () => {
	const action = fetchMoviesRequest();
	const nextState = moviesReducer(prevState, action);

	xdescribe('... the apiRequest object', () => {
		xit('... has an updated apiRequest.isFetching prop', () => {
			expect(nextState.apiRequest).to.have.property('isFetching')
				.to.eql(true);
		});

		xit('... has an apiRequest.message prop', () => {
			expect(nextState.apiRequest).to.have.property('message');
		});

		xit('... has an updated apiRequest.status', () => {
			expect(nextState.apiRequest).to.have.property('status')
				.to.eql('requesting');
		});
	});
});

xdescribe('The FETCH_MOVIES_FAILURE action', () => {
	const error = 'A mock error message';
	const action = fetchMoviesFailure(error);
	const nextState = moviesReducer(prevState, action);

	xdescribe('... the apiRequest object', () => {
		xit('... has an updated apiRequest.isFetching prop', () => {
			expect(nextState.apiRequest).to.have.property('isFetching')
				.to.eql(false);
		});

		xit('... has an apiRequest.message prop', () => {
			expect(nextState.apiRequest).to.have.property('message');
		});

		xit('... has an updated apiRequest.status', () => {
			expect(nextState.apiRequest).to.have.property('status')
				.to.eql('error');
		});
	});
});

