import React from 'react';
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import bookClub from './reducers/index.js'

import App from './containers/app.js';

let store = createStore(bookClub);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
