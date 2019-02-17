import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
// pass in state to the MovieReveiwPage via Redux
import { MuiThemeProvider } from '@material-ui/core/styles';
import { FavouritesContainer } from '../favourites';
import masterTheme from './masterTheme';
import { MovieContainer } from '../movies';

// const currUser = {
// 	username: 'Dantastic3339',
// 	id: 1,
// };

class App extends Component {
	render() {
		return (
			<Provider store={store} >
				<MuiThemeProvider theme={masterTheme}>
					<div className="App">
						<FavouritesContainer />
						<MovieContainer />
					</div>
				</MuiThemeProvider>
			</Provider>
		);
	}
}

export default App;
