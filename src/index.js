import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { getCurrencies } from './actions/currencies';
import store from './store';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

import App from './containers/App/';

store.dispatch(getCurrencies());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
