import { expect } from 'chai';
import { actionCreator } from '.';

describe('The actionCreator function', () => {
	// create the new action creator function
	// assign args to variables for testing comparisons
	const type = 'PEANUT_BUTTER';
	const madeArg1 = 'brand';
	const madeArg2 = 'style';
	const madeAction = actionCreator(type, madeArg1, madeArg2);

	// generate an action object from the new function
	const actionArg1 = 'Jiffy';
	const actionArg2 = 'crunchy';
	const action = madeAction(actionArg1, actionArg2);

	describe('--> The new action creator', () => {
		it('...is a function', () => {
			expect(actionCreator).to.be.a('function');
		});
		it('...returns a function', () => {
			expect(madeAction).to.be.a('function');
		});
	});

	describe('...the returned action object', () => {
		it('...is an object returned from the new function', () => {
			expect(action).to.be.an('object');
		});

		it('... has only two propertie', () => {
			expect(Object.keys(action).length).to.eql(2);
		});

		it('...has the expected type properties', () => {
			expect(action).to.have.property('type')
				.to.eql(type); // the test variable
		});

		it('...has a payload object property', () => {
			expect(action).to.have.property('payload')
				.to.be.an('object');
		});
	});

	describe('--> The payload object', () => {
		const { payload } = action;

		it('...has the correct number of additional args', () => {
			expect(Object.keys(payload).length).to.eql(2);
		});

		it('...has the correct prop names', () => {
			expect(payload).to.have.property(madeArg1)
				.to.eql(actionArg1);
			expect(payload).to.have.property(madeArg2)
				.to.eql(actionArg2);
		});
	});
});
