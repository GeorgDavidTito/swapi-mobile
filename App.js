/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import SwapiApp from './src/app';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SwapiApp />
    </Provider>
  );
};

export default App;
