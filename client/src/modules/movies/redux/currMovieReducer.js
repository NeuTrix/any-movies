// reducer for movies actions
export const currMovieReducer = (state={}, action={}) => {
	switch (action.type) {
    case 'UPDATE_MOVIE':
      let update = action.value
      return { ...state, update }  
    default:
      return state;
	}
};
