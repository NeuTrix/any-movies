import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import CommentsContainer from './components/CommentsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CommentsContainer/>
      </div>
    );
  }
}

export default App;
