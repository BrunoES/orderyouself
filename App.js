/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import Routes from './src/Routes';
import reducers from './src/reducers';

import firebase from 'firebase';

console.disableYellowBox = true;

export default class App extends Component {

  componentWillMount() {
    var config = {
        apiKey: "AIzaSyB81m3WqaqkFQ3zUjAptFg6SGyPje98R98",
        authDomain: "orderyourself-f4a86.firebaseapp.com",
        databaseURL: "https://orderyourself-f4a86.firebaseio.com",
        projectId: "orderyourself-f4a86",
        storageBucket: "orderyourself-f4a86.appspot.com",
        messagingSenderId: "469292518877"
      };
      firebase.initializeApp(config);
  }

  render() {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Routes />
        </Provider>
    );
  }
}

