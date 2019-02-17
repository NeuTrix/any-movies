// reducer for movies actions

export default function moviesReducer(state = {}, action = {}) {
	// deconstruct the action item
	const { type, payload } = action;

	switch (type) {
    case 'UPDATE_CURRENT_MOVIE':
      // replace the entire current state object
      return Object.assign({}, state, { currMovie: payload });
      // return default payload in case args invalid or null
    default:
      return state;
	}
};
