import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import {isMovieFavourited } from '../helpers/favouriteActions';

chai.use(chaiHttp);

// not clear how to best test axios methods (thunks?)
describe('The favouriteActions helpers', () => {
  // need to mock from seed
  const data = {
    user_id: 1,
    favourited_id: 'tt0078748',
  }
  
  it('..verifies an existing favourite', () => {
   const  ans = isMovieFavourited(data)
    console.log(ans)
    // console.log(ans)  
    expect(ans).to.eql('')
  });
  

});