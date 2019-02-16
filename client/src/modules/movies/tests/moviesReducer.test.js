import chai, { expect } from 'chai';
import { moviesReducer } from '../redux';
import { mockstate } from '../../testHelpers';
import { UPDATE_MOVIE } from '../redux';

describe('The Movies Reducer', () => {
  let state, reducer

  const newMovie = {
    imdb_id: 'tt0112431',
    ratings: [{
      metacritic: 100,
      tomatoes: 95,
    }],
    title: 'Babe',
  }
  
  beforeEach(() => {
    state = mockstate;
    reducer = moviesReducer;
  });
  
  it('...undefined action returns default state', () => {

    expect(reducer(state)).to.eql(state)
  });

  xit('...UPDATE_MOVIE can update the current movie ', () => {
    let action = {
      type: UPDATE_MOVIE,
      value: newMovie,
    };
    let newState = reducer(state, action);
    expect(newState.currMovie).to.eql(newMovie);
  });

});