import React, { Component } from 'react';
// pass in state to the MovieReveiwPage via Redux
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MovieContainer from './components/movies/MovieContainer';
import FavouritesContainer from './components/favourites/FavouritesContainer';
// add @material UI theme provider
import masterTheme from './helpers/masterTheme';

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
