import React, { Component } from 'react';
// pass in state to the MovieReveiwPage via Redux
import './App.css';
import MovieContainer from './components/Home/MovieContainer';
// add @material UI theme provider
import { MuiThemeProvider } from '@material-ui/core/styles';
import masterTheme from './helpers/masterTheme';

const curr_user = {
  userName: "Dantastic3339",
  userId: 1
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={masterTheme}>  
        <div className="App">
          <MovieContainer
            curr_user={curr_user}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
