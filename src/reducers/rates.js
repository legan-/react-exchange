import { combineReducers } from 'redux'
import {
  RECEIVE_RATES,
  SWITCH_FROM_CURRENCY,
  SWITCH_TO_CURRENCY
} from '../constants/ActionTypes'


const rate = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_RATES:
      return action.rates[action.to].toFixed(4)
    default:
      return state
  }
}

const update = (state = new Date().getTime(), action) => {
  switch (action.type) {
    case SWITCH_FROM_CURRENCY:
      return new Date().getTime()
    case SWITCH_TO_CURRENCY:
      return new Date().getTime()
    default:
      return state
  }
}

const list = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RATES:
      return {
        ...action.rates
      }
    default:
      return state
  }
}

export default combineReducers({
  rate,
  update,
  list
})

export const getRate = state => state.rate || '0'