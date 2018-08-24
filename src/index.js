import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { getCurrencies } from './actions';
import store from './store';

import './index.css';

import App from './components/App/';

store.dispatch(getCurrencies());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
