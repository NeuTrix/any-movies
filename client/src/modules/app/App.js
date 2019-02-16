import React, { Component } from 'react';
// pass in state to the MovieReveiwPage via Redux
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MovieContainer } from '../movies';
import { FavouritesContainer } from '../favourites';
import masterTheme from './masterTheme';

const currUser = {
	username: 'Dantastic3339',
	id: 1,
};

function App() {
	return (
		<MuiThemeProvider theme={masterTheme}>
			<div className="App">
				<FavouritesContainer currUser={currUser} />
				<MovieContainer currUser={currUser} />
			</div>
		</MuiThemeProvider>
	);
}

export default App;
