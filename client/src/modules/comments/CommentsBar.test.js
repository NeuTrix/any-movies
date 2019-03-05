import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// import CommentsBar from './CommentsBar';

// Needs updating now that a container is wrapping
xdescribe('The CommentsBar component', () => {
	const props = {
		comments: [],
		count: 0,
		currMovie: {},
	};

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<CommentsBar {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	describe('The CommentsBar snapshot', () => {
		const component = renderer.create(<CommentsBar {...props} />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
