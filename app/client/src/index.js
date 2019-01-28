import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// connect Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

<<<<<<< HEAD
// set initial state
const initialState = {
  movie: { id: 1 }
};

// simple reducer to support te store
function reducer(state=initialState, action) {
 return state;
}

const store = createStore(reducer);

// store.dispatch({}) //some actions

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
=======
ReactDOM.render(
    <App />
  , document.getElementById('root')
>>>>>>> integrateOMDB
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
