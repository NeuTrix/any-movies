import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import store from '../../redux/store';
import masterTheme from './masterTheme';
import { MainPageContainer } from '../main';
import { MenuBarContainer } from '../main'

function App() {
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={masterTheme}>
				<div className="App" style={{paddingTop: 45}}>
					<MenuBarContainer />
					<MainPageContainer />
				</div>
			</MuiThemeProvider>
		</Provider>
	);
}

export default App;
