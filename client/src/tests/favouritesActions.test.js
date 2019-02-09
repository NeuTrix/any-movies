import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { isFavourited } from '../actions/favouritesActions';

chai.use(chaiHttp);

// not clear how to best test axios methods (thunks?)
xdescribe('The favouritesActions helpers', () => {
	// need to mock from seed
	const data = {
		user_id: 1,
		favourited_id: 'tt0078748',
		favourited_type: 'Movie',
	}
	
	xit('..verifies an existing favourite', (done) => {
    isFavourited(data)
			.then(resp => {
				console.log('resp')
	// 		// 	// expect(resp).to.eql('')
				done();
			})

			console.log('in the test')

	});
  

});