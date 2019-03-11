import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// import MainCommentsBar from './MainCommentsBar';

// Needs updating now that a container is wrapping
xdescribe('The MainCommentsBar component', () => {
	const props = {
		comments: [],
		count: 0,
		currMovie: {},
	};

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<MainCommentsBar {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	describe('The MainCommentsBar snapshot', () => {
		const component = renderer.create(<MainCommentsBar {...props} />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
