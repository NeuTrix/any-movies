import React, { Component } from 'react';
// pass in state to the MovieReveiwPage via Redux
import './App.css';
import MovieContainer from './components/MovieContainer';
// add @material UI theme provider
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();
  
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>  
        <div className="App">
          <MovieContainer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
