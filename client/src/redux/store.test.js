import { expect } from 'chai';
import store, { defaultState } from './store';

describe('The store object', () => {
	
	const state = store.getState();
	it('...is defined', () => {
		expect(state).not.to.eql('undfined');
	});

	it('...has a default state object', () => {
		expect(state).to.be.an('object');
	});

	it('...has a default prop currMovie', () => {
		expect(state).to.have.property('currMovie');
	});

	it('...has a default prop currUser', () => {
		console.log(state.currMovie)
		expect(state).to.have.property('currUser');
	});

	it('...has a default prop favourites', () => {
		expect(state).to.have.property('favourites');
	});

	it('...has a default prop comments', () => {
		expect(state).to.have.property('comments');
	});
});
