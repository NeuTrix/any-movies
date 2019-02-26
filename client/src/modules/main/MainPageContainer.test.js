import { expect } from 'chai';
import { filterComments } from './MainPageContainer';

xdescribe('The #filterComments function', () => {
	const dictionary = {
		'132x': 100,
		b: 200,
		c: 400,
		d: 300,
	};

	const indexList = ['132x', 'c'];
	const filter = filterComments(indexList, dictionary);
	it('...returns an array of the correct length ', () => {
		expect(filter).to.be.an('array');
		expect(filter.length).to.eql(2);
	});

	it('...filters the correct values', () => {
		expect(filter.includes(dictionary['132x'])).to.eql(true);
		expect(filter.includes(dictionary['b'])).to.eql(false);
	});
});
