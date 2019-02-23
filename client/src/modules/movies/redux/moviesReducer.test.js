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
	imdb_id: 'tt0112431',
	ratings: { metacritic: 100, tomatoes: 95 },
	title: 'Babe',
};

const data2 = {
	imdb_id: 'tt0078748',
	ratings: { metacritic: 95, tomatoes: 85 },
	title: 'Alien',
};

// ensure an immutable previous state object for tests
const prevState = initialState;
deepfreeze(prevState);

describe('Movies reducer core actions', () => {
	it('...undefined action returns default previous state', () => {
		expect(moviesReducer(prevState)).to.eql(prevState);
	});
});

describe('The FETCH_MOVIES_SUCCESS action', () => {
	const action = fetchMovieSuccess(data1);
	const nextState = moviesReducer(prevState, action);
	const action2 = fetchMovieSuccess(data2);
	const nextState2 = moviesReducer(nextState, action2);


	describe('The nextState properties', () => {
		it('--> nextState has `apiRequest` prop', () => {
			expect(nextState).to.have.property('apiRequest')
				.to.be.an('object');
		});

		it('--> nextState has a movies (array) prop', () => {
			expect(nextState).to.have.property('movies')
				.to.be.an('array');
		});

		it('...movies array has the correct value', () => {
			expect(nextState.movies[0]).to.eql(data1[0].id);
		});

		it('...movies array length incremented properly', () => {
			expect(prevState.movies.length).to.eql(0);
			expect(nextState.movies.length).to.eql(1);
		});

		it('--> nextState has a `current` prop', () => {
			expect(nextState).to.have.property('current')
				.to.be.an('string');
		});

		it('...nextState has `favourited` prop', () => {
			expect(nextState).to.have.property('favourited')
				.to.be.an('boolean');
		});

		it('...nextState has `showForm` prop', () => {
			expect(nextState).to.have.property('showForm')
				.to.be.an('boolean');
		});
	});

	describe('The apiRequest object', () => {
		it('... has an updated apiRequest.isFetching prop', () => {
			expect(nextState.apiRequest).to.have.property('isFetching')
				.to.eql(false);
		});

		it('... has an apiRequest.message prop', () => {
			expect(nextState.apiRequest).to.have.property('message');
		});

		it('... has an updated apiRequest.status', () => {
			expect(nextState.apiRequest).to.have.property('status')
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

		it('...has nextState 2 dictionary of length 3', () => {
			expect(Object.keys(nextState2.dictionary).length).to.eql(3);
		});
	});
});

describe('The FETCH_MOVIES_REQUEST', () => {
	const action = fetchMoviesRequest();
	constnextState = moviesReducer(prevState, action);

	describe('... the apiRequest object', () => {
		it('... has an updated apiRequest.isFetching prop', () => {
			expect(nextState.apiRequest).to.have.property('isFetching')
				.to.eql(true);
		});

		it('... has an apiRequest.message prop', () => {
			expect(nextState.apiRequest).to.have.property('message');
		});

		it('... has an updated apiRequest.status', () => {
			expect(nextState.apiRequest).to.have.property('status')
				.to.eql('requesting');
		});
	});
});

describe('The FETCH_MOVIES_FAILURE action', () => {
	const error = 'A mock error message';
	const action = fetchMovieFailure(error);
	const nextState = moviesReducer(prevState, action);

	describe('... the apiRequest object', () => {
		it('... has an updated apiRequest.isFetching prop', () => {
			expect(nextState.apiRequest).to.have.property('isFetching')
				.to.eql(false);
		});

		it('... has an apiRequest.message prop', () => {
			expect(nextState.apiRequest).to.have.property('message');
		});

		it('... has an updated apiRequest.status', () => {
			expect(nextState.apiRequest).to.have.property('status')
				.to.eql('error');
		});
	});
});

describe('The SET_CURRENT_COMMENT action', () => {
	const action = setCurrentMovie(data1[0].id);
	const nextState = moviesReducer(prevState, action);

	it('...has an updated current prop', () => {
		expect(nextState).to.have.property('current')
			.to.be.an('string');
	});

	it('...has the expected value', () => {
		expect(nextState.current).to.eql(data1[0].id);
	});
});
