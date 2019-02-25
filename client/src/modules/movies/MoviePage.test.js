import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mockstate } from '../testHelpers';
import MoviePage from './MoviePage';

describe('The MoviePage component', () => {
	const { commentable, comments } = mockstate;
	const props = { commentable, comments };

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MoviePage {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	describe('The MoviePage snapshot', () => {
		const component = renderer.create(<MoviePage {...props} />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
