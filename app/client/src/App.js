import React, { Component } from 'react';
// pass in state to the MovieReveiwPage via Redux
import './App.css';
import MovieContainer from './components/MovieContainer';
// add @material UI theme provider
import { MuiThemeProvider } from '@material-ui/core/styles';
import masterTheme from './helpers/masterTheme';

  
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={masterTheme}>  
        <div className="App">
          <MovieContainer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
