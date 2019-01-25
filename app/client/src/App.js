import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import CommentsContainer from './components/CommentsContainer';
import MoviesContainer from './components/MoviesContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MoviesContainer/>
        <CommentsContainer/>
      </div>
    );
  }
}

export default App;
