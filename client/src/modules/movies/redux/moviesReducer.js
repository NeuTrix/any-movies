// reducer for movies actions

export default function moviesReducer(state = {}, action = {}) {
	// deconstruct the action item
	const { type, value } = action;

	switch (type) {
    case 'UPDATE_CURRENT_MOVIE':
      // replace the entire current state object
      return value;
      // return default value in case args invalid or null
    default:
      return state;
	}
};
