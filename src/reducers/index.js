import { combineReducers } from 'redux'

import currencies from './currencies'
import rates from './rates'


export default combineReducers({
  currencies,
  rates
})