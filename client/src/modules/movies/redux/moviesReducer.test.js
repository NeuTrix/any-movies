import { expect } from 'chai';
import { mockstate } from '../../testHelpers';
import { moviesReducer } from './moviesReducer';
// deepfreeze // add to test for immutability

xdescribe('The Movies Reducer', () => {
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
		state = mockstate;
	});

	it('...undefined action returns default state', () => {
		expect(reducer(state)).to.eql(state);
	});

	it('...UPDATE_CURRENT_MOVIE can update the current movie ', () => {
		const action = { type: UPDATE_CURRENT_MOVIE, value: newMovie };
		const newState = reducer(state.currMovie, action);
		expect(newState).to.eql(newMovie);
	});
});
