import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import MainDisplay from './components/MainDisplay';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainDisplay/>
      </div>
    );
  }
}

export default App;
