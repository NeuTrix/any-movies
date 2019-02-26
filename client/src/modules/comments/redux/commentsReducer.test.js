
import deepfreeze from 'deep-freeze';
import { expect } from 'chai';

// action creators
import {
	addComment,
	fetchCommentsFailure,
	fetchCommentsRequest,
	fetchCommentsSuccess,
	setCommentable,
} from './commentsActions';

// test objects
import {
	comments1,
	comments2,
	dictionary1,
	dictionary2,
} from '../../testHelpers';

import commentsReducer, { initialState } from './commentsReducer';

// ensure an immutable previous state object for tests
const prevState = initialState;
deepfreeze(prevState);
deepfreeze(initialState);

describe('Comments reducer default actions', () => {
	it('...undefined action returns default previous state', () => {
		expect(commentsReducer(prevState)).to.eql(prevState);
	});
});

describe('The default state properties', () => {
	it('... has a the expected number of default properties', () => {
		expect(Object.keys(initialState).length).to.eql(8);
	});

	it('...has a `apiStatus` property (object)', () => {
		expect(initialState).to.have.property('apiStatus')
			.to.be.a('object');
	});

	it('...has a `comments` property (object)', () => {
		expect(initialState).to.have.property('comments')
			.to.be.a('array');
	});

	it('...has a `commentable` property (object)', () => {
		expect(initialState).to.have.property('commentable')
			.to.be.a('object');
	});

	it('...has a `current` property (object)', () => {
		expect(initialState).to.have.property('current')
			.to.be.a('object');
	});

	it('...has a `dictionary` property (object)', () => {
		expect(initialState).to.have.property('dictionary')
			.to.be.a('object');
	});

	it('...has a `favourited` property (object)', () => {
		expect(initialState).to.have.property('favourited')
			.to.be.a('boolean');
	});

	it('...has a `indexes` property (object)', () => {
		expect(initialState).to.have.property('indexes')
			.to.be.a('array');
	});

	it('...has a `showForm` property (object)', () => {
		expect(initialState).to.have.property('showForm')
			.to.be.a('boolean');
	});
});

describe('The FETCH_COMMENTS_SUCCESS action', () => {
	const action = fetchCommentsSuccess(comments1, dictionary1);
	const nextState = commentsReducer(prevState, action);
	const action2 = fetchCommentsSuccess(comments2, dictionary2);
	const nextState2 = commentsReducer(nextState, action2);

	describe('The nextState properties', () => {
		it('--> nextState has `apiStatus` prop', () => {
			expect(nextState).to.have.property('apiStatus')
				.to.be.an('object');
		});

		it('--> nextState has a indexes (array) prop', () => {
			expect(nextState).to.have.property('indexes')
				.to.be.an('array');
		});

		it('...indexes array has the correct value', () => {
			expect(nextState.indexes[0]).to.eql(comments1[0]);
		});

		it('...indexes array length incremented properly', () => {
			expect(prevState.indexes.length).to.eql(0);
			expect(nextState.indexes.length).to.eql(1);
		});

		it('--> nextState has a `commentable` prop', () => {
			expect(nextState).to.have.property('commentable')
				.to.be.an('object');
		});

		it('...nextState has `favourited` prop', () => {
			expect(nextState).to.have.property('favourited')
				.to.be.an('boolean');
		});

		it('...nextState has `showForm` prop', () => {
			expect(nextState).to.have.property('showForm')
				.to.be.an('boolean');
		});
	});

	describe('The apiStatus object', () => {
		it('... has an updated apiStatus.isFetching prop', () => {
			expect(nextState.apiStatus).to.have.property('isFetching')
				.to.eql(false);
		});

		it('... has an apiStatus.message prop', () => {
			expect(nextState.apiStatus).to.have.property('message');
		});

		it('... has an updated apiStatus.status', () => {
			expect(nextState.apiStatus).to.have.property('status')
				.to.eql('success');
		});
	});

	describe('The dictionary prop | sub reducer', () => {
		it('...has initial dictionary of length 0', () => {
			expect(Object.keys(prevState.dictionary).length).to.eql(0);
		});

		it('...has nextState 1 dictionary of length 1', () => {
			expect(Object.keys(nextState.dictionary).length).to.eql(1);
		});

		it('...has nextState 2 dictionary of length 3', () => {
			expect(Object.keys(nextState2.dictionary).length).to.eql(3);
		});
	});
});

describe('The FETCH_COMMENTS_REQUEST', () => {
	const action = fetchCommentsRequest();
	const nextState = commentsReducer(prevState, action);

	describe('... the apiStatus object', () => {
		it('... has an updated apiStatus.isFetching prop', () => {
			expect(nextState.apiStatus).to.have.property('isFetching')
				.to.eql(true);
		});

		it('... has an apiStatus.message prop', () => {
			expect(nextState.apiStatus).to.have.property('message');
		});

		it('... has an updated apiStatus.status', () => {
			expect(nextState.apiStatus).to.have.property('status')
				.to.eql('requesting');
		});
	});
});

describe('The FETCH_COMMENTS_FAILURE action', () => {
	const error = 'A mock error message';
	const action = fetchCommentsFailure(error);
	const nextState = commentsReducer(prevState, action);

	describe('... the apiStatus object', () => {
		it('... has an updated apiStatus.isFetching prop', () => {
			expect(nextState.apiStatus).to.have.property('isFetching')
				.to.eql(false);
		});

		it('... has an apiStatus.message prop', () => {
			expect(nextState.apiStatus).to.have.property('message');
		});

		it('... has an updated apiStatus.status', () => {
			expect(nextState.apiStatus).to.have.property('status')
				.to.eql('error');
		});
	});
});

describe('The SET_COMMENTABLE action', () => {
	const action = setCommentable(comments1[0]);
	const nextState = commentsReducer(prevState, action);

	it('...has an updated commentable prop', () => {
		expect(nextState).to.have.property('commentable')
			.to.be.an('object');
	});

	it('...has the expected value', () => {
		expect(nextState.commentable.id).to.eql(comments1[0]);
	});
});

describe.only('The ADD_COMMENTS_TO_DICTIONARY action', () => {
	const data = {
		body: 'this is a test',
		commentable_id: 'tt0078748',
		commentable_type: 'Movie',
		title: 'A test comment',
		user_id: 1,
	};
	const action = addComment(data);
	const nextState = commentsReducer(prevState, action);
	const prevLength = Object.keys(prevState.dictionary).length;
	const nextLength = Object.keys(nextState.dictionary).length;

	it('...can add a new comment', () => {
		expect(prevLength).to.eql(0);
		expect(nextLength).to.eql(1);
	});
});
