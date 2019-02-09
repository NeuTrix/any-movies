import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import {isFavourited } from '../helpers/favouritesActions';

chai.use(chaiHttp);

// not clear how to best test axios methods (thunks?)
describe.only('The favouritesActions helpers', () => {
	// need to mock from seed
	const data = {
		user_id: 1,
		favourited_id: 'tt0078748',
		favourited_type: 'Movie',
	}
  
	it('..verifies an existing favourite', () => {
    isFavourited(data)
    .then(resp)
		console.log(ans)
		// console.log(ans)  
  expect(ans).to.eql('')
	});
  

});