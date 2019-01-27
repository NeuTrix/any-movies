import React, { Component } from 'react';
// pass in state to the MovieReveiwPage via Redux
import './App.css';
import MovieReviewPage from './components/MovieReviewPage';
// add @material UI theme provider
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();
  
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>  
        <div className="App">
          <MovieReviewPage/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
