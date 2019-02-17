// reducer for movies actions
// add defaults to prevent errors for missing args
export default function movieReducer(state = {}, action = {}) {
	// deconstruct the action item
	const { type, value } = action;

	switch (type) {
    case 'UPDATE_MOVIE':
      // replace the current state object
      return value;
      // return default value in case args invalid or null
    default:
      return state;
	}
};
