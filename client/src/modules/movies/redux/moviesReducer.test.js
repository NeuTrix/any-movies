import { expect } from 'chai';
import deepfreeze from 'deep-freeze';
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
	UPDATE_CURRENT_MOVIE,
} from './moviesConstants';
import {
	fetchMovieRequest,
	fetchMovieSuccess,
	fetchMovieFailure,
} from './moviesActions'


// import { mockstate } from '../../testHelpers';
import moviesReducer from './moviesReducer';

// deepfreeze // add to test for immutability
const newMovie = {
	imdb_id: 'tt0112431',
	ratings: {
		metacritic: 100,
		tomatoes: 95,
	},
	title: 'Babe',
};

describe('The Movies Reducer', () => {
	let state; // initial state object for testing

	beforeEach(() => {
		state = { };
		deepfreeze(state)
	});

	it('...undefined action returns default state', () => {
		expect(moviesReducer(state)).to.eql(state);
	});

	it('...UPDATE_CURRENT_MOVIE can update the current movie ', () => {
		const action = { type: UPDATE_CURRENT_MOVIE, payload: newMovie };
		const newState = moviesReducer(state, action);
		expect(newState.currMovie).to.eql(newMovie);
	});
});

describe('MoviesReducer Async Actions', () => {
	let state = {};

	beforeEach(() => {
		state = {
			currMovie: newMovie,
			requestsToOMBD: {
				isFetching: false,
				status: 'pending',
			},
		};
		deepfreeze(state)
	});
	
	describe('=> FETCH_MOVIE_REQUEST', () => {
		const action = fetchMovieRequest('Babe');
		const newState = moviesReducer(state, action);

		it.only('..sets `requestsToOMBD.isFetching` to `true`', () => {
			expect(newState.requestsToOMBD.isFetching).to.eql(true);
			expect(newState.requestsToOMBD.movieTitle).to.eql('Babe');
			expect(newState.requestsToOMBD.status).to.eql('requested');
		});
	});

	describe('=> FETCH_MOVIE_SUCCESS', () => {
		const action = fetchMovieSuccess('Babe');
		const newState = moviesReducer(state, action);

		it('..sets is`requestsToOMBD.status` to `successful`', () => {
			expect(newState.requestsToOMBD.status).to.eql('successful');
		});
	});

	describe('=> FETCH_MOVIE_FAILURE', () => {
		const action = fetchMovieFailure('Babe');
		const newState = moviesReducer(state, action);

		it('..sets is`requestsToOMBD.status` to `errored`', () => {
			expect(newState.requestsToOMBD.status).to.eql('errored');
		});
	});

});
