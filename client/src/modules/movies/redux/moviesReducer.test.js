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

describe('The Movies Reducer', () => {
	const reducer = moviesReducer; // short cut for the reducer
	let state = {}; // initial state object for testing

	const newMovie = {
		imdb_id: 'tt0112431',
		ratings: {
			metacritic: 100,
			tomatoes: 95,
		},
		title: 'Babe',
	};

	beforeEach(() => {
		state = { };
	});

	it('...undefined action returns default state', () => {
		expect(reducer(state)).to.eql(state);
	});

	it('...UPDATE_CURRENT_MOVIE can update the current movie ', () => {
		const action = { type: UPDATE_CURRENT_MOVIE, payload: newMovie };
		const newState = reducer(state, action);
		expect(newState.currMovie).to.eql(newMovie);
	});

	describe('MoviesReducer Async Actions', () => {
		
		it('... can FETCH_MOVIE_REQUEST', () => {
			const action = {
				type: FETCH_MOVIE_REQUEST,
				movieID: 'tt0112431'
			}
			const newState = reducer
		});
	});

});
