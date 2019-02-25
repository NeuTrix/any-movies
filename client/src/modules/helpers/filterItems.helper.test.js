import { expect } from 'chai';
import filterItems from './filterItems.helper';

describe('The Filter Items function', () => {
	const indexes = ['first', 'last'];
	const dictionary = {
		first: { name: 'mickey' },
		last: { name: 'mouse' },
		next: 'whatever',
		previous: [1, 2, 3],
	};
	const test = filterItems(indexes, dictionary);

	it('...is a function', () => {
		expect(filterItems).to.be.a('function');
	});

	it('...returns an array for filtered items', () => {
		expect(test).to.be.an('array');
	});

	it('...has the proper length', () => {
		expect(test.length).to.eql(2);
	});

	it('... has the expected properties', () => {
		expect(test[0]).to.eql(dictionary[indexes[0]]);
		expect(test[1]).to.eql(dictionary[indexes[1]]);
	});
});
