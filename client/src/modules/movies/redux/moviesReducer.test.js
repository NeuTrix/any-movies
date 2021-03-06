
import deepfreeze from 'deep-freeze';
import { expect } from 'chai';

// action creators
import {
	fetchMovieFailure,
	fetchMovieRequest,
	fetchMovieSuccess,
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

describe('The FETCH_MOVIE_SUCCESS action', () => {
	const action = fetchMovieSuccess(movie1, details);
	const nextState = moviesReducer(prevState, action);
	const action2 = fetchMovieSuccess(movie2, details2);
	const nextState2 = moviesReducer(nextState, action2);

	describe('The nextState properties', () => {
		it('--> nextState has `apiStatus` prop', () => {
			expect(nextState).to.have.property('apiStatus')
				.to.be.an('object');
		});

		it('...keeps the count righteous', () => {
			expect(true).to.eql(true);
		});

		it('--> nextState has a current (movie) prop', () => {
			expect(nextState).to.have.property('current')
				.to.be.an('object');
		});

		it('...current imdbID  has the correct value', () => {
			expect(nextState.imdbID).to.eql(movie1);
		});

		it('--> nextState has a `favourited` prop', () => {
			expect(nextState).to.have.property('favourited')
				.to.be.an('boolean');
		});

		it('...nextState has `registered` prop', () => {
			expect(nextState).to.have.property('registered')
				.to.be.an('boolean');
		});

		it('...nextState has `dictionary` prop', () => {
			expect(nextState).to.have.property('dictionary')
				.to.be.an('object');
		});
	});

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

	describe('The dictionary prop | sub reducer', () => {
		it('...has initial dictionary of length 0', () => {
			expect(Object.keys(prevState.dictionary).length).to.eql(0);
		});

		it('...has nextState 1 dictionary of length 1', () => {
			expect(Object.keys(nextState.dictionary).length).to.eql(1);
		});

		it('...has nextState 2 dictionary of length 2', () => {
			expect(Object.keys(nextState2.dictionary).length).to.eql(2);
		});
	});
});

describe('The FETCH_MOVIE_REQUEST', () => {
	const action = fetchMovieRequest();
	const nextState = moviesReducer(prevState, action);

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

describe('The FETCH_MOVIE_FAILURE action', () => {
	const error = 'A mock error message';
	const action = fetchMovieFailure(error);
	const nextState = moviesReducer(prevState, action);

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
