import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { getCurrencies } from './actions' 

import App from './components/App'
import reducer from './reducers'

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getCurrencies())

ReactDOM.render(
  <Provider store={ store }>
  	<App />
  </Provider>,
  document.getElementById('root')
)