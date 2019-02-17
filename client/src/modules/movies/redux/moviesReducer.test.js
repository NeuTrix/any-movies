import { expect } from 'chai';
import {
	FETCH_MOVIE_FAILURE,
	FETCH_MOVIE_REQUEST,
	FETCH_MOVIE_SUCCESS,
	UPDATE_CURRENT_MOVIE,
} from './moviesConstants';

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

xdescribe('The Movies Reducer', () => {
	let state; // initial state object for testing

	beforeEach(() => {
		state = { };
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
			}
		}
	});
	
	describe('=> FETCH_MOVIE_REQUEST', () => {
		const action = {
			type: FETCH_MOVIE_REQUEST,
			movieID: 'tt0112431',
		}
		const newState = moviesReducer(state, action);
		
		it('..sets `isFetching` to `true`', () => {
			expect(newState.requestsToOMBD.isFetching).to.eql(true)
		});
	});
});