import chai, { expect } from 'chai';
import { currMovieReducer } from '../redux';
import { mockstate } from '../../testHelpers';
import { UPDATE_MOVIE } from '../redux';

describe('The Movies Reducer', () => {
	let reducer, state;

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
		reducer = currMovieReducer;
	});

	it('...undefined action returns default state', () => {
		expect(reducer(state)).to.eql(state);
	});

	it.only('...UPDATE_MOVIE can update the current movie ', () => {
		const action = {
			type: UPDATE_MOVIE,
			value: newMovie,
		};
		const newState = reducer(state.currMovie, action);
    console.log('xx', newState);
    console.log(state)
		// expect(newState.currMovie).to.eql(newMovie);
	});
});
