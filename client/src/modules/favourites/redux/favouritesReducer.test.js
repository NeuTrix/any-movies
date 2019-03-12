
import deepfreeze from 'deep-freeze';
import { expect } from 'chai';
import favouritesReducer, { initialState } from './favouritesReducer';

// action creators
import {
	checkIsFavouritedFailure,
	checkIsFavouritedRequest,
	checkIsFavouritedSuccess,
	updateIsFavouritedStatus,
} from './favouritesActions';

// test objects
import { movie1, movie2 } from '../../testHelpers';

// ensure an immutable previous state object for tests
const prevState = initialState;
// deepfreeze(prevState);

describe('Favourites reducer default actions', () => {
	it('...undefined action returns default previous state', () => {
		expect(favouritesReducer()).to.eql(initialState);
	});
});

// describe('The default state properties', () => {
// 	xit('... has a the expected number of default properties', () => {
// 		expect(Object.keys(initialState).length).to.eql(3);
// 	});

// 	xit('...has a `apiStatus` property (object)', () => {
// 		expect(initialState).to.have.property('apiStatus')
// 			.to.be.a('object');
// 	});

// 	xit('...has a `dictionary` property (object)', () => {
// 		expect(initialState).to.have.property('dictionary')
// 			.to.be.a('object');
// 	});

// 	xit('...has a `favourited` property (object)', () => {
// 		expect(initialState).to.have.property('favourited')
// 			.to.be.a('boolean');
// 	});

// });

//
