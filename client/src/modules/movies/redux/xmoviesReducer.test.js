import { expect } from 'chai';
import deepfreeze from 'deep-freeze';

it('the suite is turned off', () => {
  
});
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
	SET_CURRENT_MOVIE,
} from './moviesConstants';

import {
	fetchMovieRequest,
	fetchMovieSuccess,
	fetchMovieFailure,
} from './moviesActions';

import moviesReducer from './moviesReducer';

const newMovie = {
	imdb_id: 'tt0112431',
	ratings: { metacritic: 100, tomatoes: 95 },
	title: 'Babe',
};

describe('The Movies Reducer', () => {
	let prevState; // initial prevState object for testing

	beforeEach(() => {
		prevState = { };
		// deepfreeze // add to test for immutability
		deepfreeze(prevState);
	});

	it('...undefined action returns default prevState', () => {
		expect(moviesReducer(prevState)).to.eql(prevState);
	});

	
});

describe('MoviesReducer Async Actions', () => {
	let prevState;

	beforeEach(() => {
		prevState = {
			currMovie: {},
			requestToOmdbApi: {
				isFetching: false,
				message: '',
				status: 'pending',
			},
		};
		deepfreeze(prevState);
	});

	describe('=> FETCH_MOVIE_REQUEST', () => {
		const movieTitle = 'Babe';
		const action = fetchMovieRequest(movieTitle);
		const newState = moviesReducer(prevState, action);

		it('... sets `requestToOmdbApi.isFetching` to be `true`', () => {
			expect(newState.requestToOmdbApi.isFetching).to.eql(true);
		});

		it('... sets `requestToOmdbApi.status` to be `requesting`', () => {
			expect(newState.requestToOmdbApi.status).to.eql('requesting');
		});

		it('... prevState had a `currMovie` prop', () => {
			expect(prevState).to.have.property('currMovie')
		});

		it('... newState to have `currMovie` prop', () => {
			expect(newState).to.have.property('currMovie')
		});
	});

	describe('=> FETCH_MOVIE_SUCCESS', () => {
		const action = fetchMovieSuccess(newMovie);
		const newState = moviesReducer(prevState, action);

		it('... sets `requestToOmdbApi.isFetching` to be `false`', () => {
			expect(newState.requestToOmdbApi.isFetching).to.eql(false);
		});

		it('... sets `requestToOmdbApi.status` to be `success`', () => {
			expect(newState.requestToOmdbApi.status).to.eql('success');
		});

		it('...updates the currMovie object', () => {
			expect(newState.currMovie).to.eql(newMovie)
		});

	});

	describe('=> FETCH_MOVIE_FAILURE', () => {
		const error = 'A mock error message';
		const action = fetchMovieFailure(error);
		const newState = moviesReducer(prevState, action);

		it('... sets `requestToOmdbApi.isFetching` to be`false`', () => {
			expect(newState.requestToOmdbApi.isFetching).to.eql(false);
		});

		it('... sets `requestToOmdbApi.status` to be`error`', () => {
			expect(newState.requestToOmdbApi.status).to.eql('error');
		});

		it('...updates the isFetching message with error data', () => {
			expect(newState.requestToOmdbApi.message).to.eql(error);
		});
	});

});
