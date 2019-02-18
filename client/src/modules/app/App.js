import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import store from '../../redux/store';
// pass in state to the MovieReveiwPage via Redux
// import { FavouritesContainer } from '../favourites';
import masterTheme from './masterTheme';
// import { MoviePageContainer } from '../movies';
import { MainPageContainer } from '../main';
import { MenuBarContainer } from '../main'

function App() {
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={masterTheme}>
				<div className="App">
					<MenuBarContainer />
					<MainPageContainer />
				</div>
			</MuiThemeProvider>
		</Provider>
	);
}

export default App;
