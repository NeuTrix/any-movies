import { expect } from 'chai';
import { makeActionCreator } from '.';

describe('THe makeActionCreator function', () => {
	const type = 'PEANUT_BUTTER';
	const madeArg1 = 'brand';
	const madeArg2 = 'style';
	const madeAction = makeActionCreator(type, madeArg1, madeArg2);

	it('...is a function', () => {
		expect(makeActionCreator).to.be.a('function');
	});

	it('...returns a function', () => {
		expect(madeAction).to.be.a('function');
	});

	describe('...the returned function', () => {
		// generate an action object
		const actionArg1 = 'Jiffy';
		const actionArg2 = 'crunchy';
		const action = madeAction(actionArg1, actionArg2);

		it('...creates an action object', () => {
			expect(action).to.be.an('object');
		});

		it('...with the expected type property', () => {
			expect(action).to.have.property('type')
				.to.eql(type); // the test variable
		});

		it('...has the correct number of additional args', () => {
			console.log(Object.keys(action));
			expect(Object.keys(action).length).to.eql(3);
		});

		it('...has the correct prop names', () => {
			expect(action).to.have.property(madeArg1)
				.to.eql(actionArg1);
			expect(action).to.have.property(madeArg2)
				.to.eql(actionArg2);
		});
	});
});
