import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import store from '../../redux/store';
// pass in state to the MovieReveiwPage via Redux
// import { FavouritesContainer } from '../favourites';
import masterTheme from './masterTheme';
// import { MoviePageContainer } from '../movies';
import MainPage from './MainPage';

function App() {
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={masterTheme}>
				<div className="App">
					<MainPage />
					{/* <FavouritesContainer /> */}
					{/* <MoviePageContainer /> */}
				</div>
			</MuiThemeProvider>
		</Provider>
	);
}

export default App;
