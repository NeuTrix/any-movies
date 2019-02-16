import React from 'react';
import ReactDOM from 'react-dom';
import { mockstate } from '../../testHelpers';
import MovieDisplay from '../MovieDisplay';

describe('The MovieDispaly component', () => {
	const { currMovie, currUser } = mockstate;
	const props = { currMovie, currUser };

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MovieDisplay {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
