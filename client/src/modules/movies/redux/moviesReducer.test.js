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
	let prevState; // initial prevState object for testing

	beforeEach(() => {
		prevState = { };
		deepfreeze(prevState)
	});

	it('...undefined action returns default prevState', () => {
		expect(moviesReducer(prevState)).to.eql(prevState);
	});

	it('...UPDATE_CURRENT_MOVIE can update the current movie ', () => {
		const action = { type: UPDATE_CURRENT_MOVIE, payload: newMovie };
		const newState = moviesReducer(prevState, action);
		expect(newState.currMovie).to.eql(newMovie);
	});
});

describe('MoviesReducer Async Actions', () => {
	let prevState;

	beforeEach(() => {
		prevState = {
			currMovie: {},
			requestToOmdbApi: {
				isFetching: false,
				status: 'pending',
			},
		};
		deepfreeze(prevState)
	});
	
	describe('=> FETCH_MOVIE_REQUEST', () => {
		const action = fetchMovieRequest('Babe');
		const newState = moviesReducer(prevState, action);

		it('... sets `requestToOmdbApi.isFetching` to `true`', () => {
			expect(newState.requestToOmdbApi.isFetching).to.eql(true);
		});

		it('... sets `requestToOmdbApi.status` to `requesting`', () => {
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

		it('... sets `requestToOmdbApi.isFetching` to `false`', () => {
			expect(newState.requestToOmdbApi.isFetching).to.eql(false);
		});

		xit('... sets `requestToOmdbApi.status` to `requesting`', () => {
			expect(newState.requestToOmdbApi.status).to.eql('requesting');
		});
		
		xit('..sets is`requestToOmdbApi.status` to `successful`', () => {
			expect(newState.requestToOmdbApi.status).to.eql('successful');
		});

		xit('...updates the currMovie object', () => {
			console.log(newState)
			expect(newState.currMovie).to.eql(newMovie)
		});

		xit('... resets `isFetching` to false', () => {
			
		});
	});

	describe('=> FETCH_MOVIE_FAILURE', () => {
		const action = fetchMovieFailure('Babe');
		const newState = moviesReducer(prevState, action);

		xit('..sets is`requestToOmdbApi.status` to `errored`', () => {
			expect(newState.requestToOmdbApi.status).to.eql('errored');
		});
	});

});
