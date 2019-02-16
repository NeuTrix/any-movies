import React from 'react';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow } from 'enzyme';
import { isFavourited } from '../actions/favouritesActions';
import MovieContainer from '../modules/movies';

describe('The registerMovie function', () => {

	const mockData = {
		title: 'Alien-ated',
		imdb_id: 'tt0000789',
  };
  
  const mockUser = {
    id: 3,
    username: 'money',
  }

  	// spy to watch the function, attached to this object
	const spy = jest.spyOn(MovieContainer.prototype, 'registerMovie');
	// render shallow copy of the component for testing
	const movie = shallow(<MovieContainer currUser={mockUser}/>);

	const mockMovie = {
		'id': 'tt0118715',
		title: 'The Big Lebowski',
		release_date: null,
		rated: null,
		critic_rating: null,
		created_at: '2019-02-12T04:59:32.454Z',
		'updated_at': '2019-02-12T04:59:32.454Z',
		description: null,
		imdb_id: 'tt0118719',
	};

	beforeEach(() => {
		const mockServer = new MockAdapter(axios);
		mock
			.onPost('/api/movies/', mockData)
			.response(201, mockMovie);
	});


	it('can register a new movie', () => {
		movie.registerMovie(mockData);
		expect(spy).toHaveBeenCalled();
	});
});

