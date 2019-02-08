import React, { Component } from 'react';
// pass in state to the MovieReveiwPage via Redux
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MovieContainer from './components/movies/MovieContainer';
// add @material UI theme provider
import masterTheme from './helpers/masterTheme';

// mock a current user session
const currUser = {
	username: 'Dantastic3339',
	id: 1,
};

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={masterTheme}>
				<div className="App">
					<MovieContainer
						currUser={currUser}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
