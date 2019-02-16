import chai, { expect } from 'chai';
import { moviesReducer } from '../redux';
import { mockstate } from '../../testHelpers';
import { ADD_MOVIE } from '../redux';

describe('The Movies Reducer', () => {
  
  it('...undefined action returns default state', () => {
    let test = moviesReducer(mockstate)

    expect(test).to.eql(mockstate)
  });

  it('...can process an ADD_ACTION ', () => {
    
  });

});