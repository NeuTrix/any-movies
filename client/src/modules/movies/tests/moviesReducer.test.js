import chai, { expect } from 'chai';
import { moviesReducer } from '../redux';
import { mockstate } from '../../testHelpers';

describe('The Movies Reducer', () => {
  
  it('...undefined action returns default state', () => {
    let test = moviesReducer(mockstate)

    expect(test).to.eql(mockstate)
  });

});