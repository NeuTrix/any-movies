import React, { Component } from 'react';
// pass in state to the MovieReveiwPage via Redux
import './App.css';
import MovieReviewPage from './components/MovieReviewPage';
class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieReviewPage/>
      </div>
    );
  }
}

export default App;
