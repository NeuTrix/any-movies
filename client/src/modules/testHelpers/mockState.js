// present a mock state object for testing
// Need to consolidate this into a factory or other test helper file
const mockstate = {
	currMovie: {
		imdb_id: 'tt0078748',
		ratings: [{
			metacritic: 90,
			tomatoes: 10,
		}],
		title: 'Alien',
	},
	currUser: {
		id: 20,
		username: 'mickey333',
	},
	favourites: {},
};

export default mockstate;
