import { expect } from 'chai';
import deepfreeze from 'deep-freeze';

import {
	fetchMovieFailure,
	fetchMovieRequest,
	fetchMovieSuccess,
	setCurrentMovie,
} from './moviesActions';

import moviesReducer, {
	initialState,
} from './moviesReducer';

const data1 = {
	Ratings: { metacritic: 100, tomatoes: 95 },
	Title: 'Babe',
	imdbID: 'tt0112431',
};

const data2 = {
	Ratings: { metacritic: 95, tomatoes: 85 },
	Title: 'Alien',
	imdbID: 'tt0078748',
};

// ensure an immutable previous state object for tests
const prevState = initialState;
deepfreeze(prevState);

describe('Movies reducer core actions', () => {
	it('...undefined action returns default previous state', () => {
		expect(moviesReducer(prevState)).to.eql(prevState);
	});
});

describe('The FETCH_MOVIE_SUCCESS action', () => {
	const action = fetchMovieSuccess(data1);
	const nextState = moviesReducer(prevState, action);
	const action2 = fetchMovieSuccess(data2);
	const nextState2 = moviesReducer(nextState, action2);

	describe('The nextState properties', () => {
		xit('--> nextState has `apiRequest` prop', () => {
			expect(nextState).to.have.property('apiRequest')
				.to.be.an('object');
		});

		xit('--> nextState has a commentIndexes (array) prop', () => {
			expect(nextState).to.have.property('commentIndexes')
				.to.be.an('array');
		});

		xit('...movies array has the correct value', () => {
			expect(nextState.movies[0]).to.eql(data1.imdbID);
		});

		xit('...movies array length incremented properly', () => {
			expect(prevState.movies.length).to.eql(0);
			expect(nextState.movies.length).to.eql(1);
		});

		xit('--> nextState has a `current` prop', () => {
			expect(nextState).to.have.property('current')
				.to.be.an('string');
		});

		xit('...nextState has `favourited` prop', () => {
			expect(nextState).to.have.property('favourited')
				.to.be.an('boolean');
		});

		xit('...nextState has `showForm` prop', () => {
			expect(nextState).to.have.property('showForm')
				.to.be.an('boolean');
		});
	});

	describe('The apiRequest object', () => {
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

	describe('The dictionary prop | sub reducer', () => {
		xit('...has initial dictionary of length 0', () => {
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

describe('The FETCH_MOVIE_REQUEST', () => {
	const action = fetchMovieRequest();
	const nextState = moviesReducer(prevState, action);

	describe('... the apiRequest object', () => {
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

describe('The FETCH_MOVIE_FAILURE action', () => {
	const error = 'A mock error message';
	const action = fetchMovieFailure(error);
	const nextState = moviesReducer(prevState, action);

	describe('... the apiRequest object', () => {
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

xdescribe('The SET_COMMENTABLE action', () => {
	const action = setCurrentMovie(data1.imdbID);
	const nextState = moviesReducer(prevState, action);

	xit('...has an updated current prop', () => {
		expect(nextState).to.have.property('current')
			.to.be.an('string');
	});

	xit('...has the expected value', () => {
		expect(nextState.current).to.eql(data1.imdbID);
	});
});
