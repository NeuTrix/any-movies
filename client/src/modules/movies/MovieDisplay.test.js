import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mockstate } from '../testHelpers';
import MovieDisplay from './MovieDisplay';

describe('The MovieDisplay component', () => {
	const { currMovie, currUser } = mockstate;
	const props = { currMovie, currUser };

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MovieDisplay {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	describe('The MovieDisplay snapshot', () => {

		const component = renderer.create(
			<MovieDisplay { ...props } />
		);
		
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	});

});
