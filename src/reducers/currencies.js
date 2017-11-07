=import { combineReducers } from 'redux'
import { 
  RECEIVE_CURRENCIES,
  RECEIVE_RATES,
  UPDATE_OUTPUT,
  SET_CURRENCIES,
  TOGGLE_FROM_DROPDOWN,
  TOGGLE_TO_DROPDOWN,
  SWITCH_FROM_CURRENCY,
  SWITCH_TO_CURRENCY,
  EXCHANGE_REQUEST,
  EXCHANGE_SUCCESS
} from '../constants/ActionTypes'


const list = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENCIES:
      return {
        ...state,
        ...action.currencies.reduce((obj, currency) => {
          obj[currency.id] = currency
          return obj
        }, {})
      }
    default:
      return state
  }
}

const isFromOpened = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_FROM_DROPDOWN:
      return !state
    case TOGGLE_TO_DROPDOWN:
      return false
    case SWITCH_FROM_CURRENCY:
      return false
    case SWITCH_TO_CURRENCY:
      return false
    case EXCHANGE_REQUEST:
      return false
    default:
      return state
  }
}

const isToOpened = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_TO_DROPDOWN:
      return !state
    case TOGGLE_FROM_DROPDOWN:
      return false
    case SWITCH_FROM_CURRENCY:
      return false
    case SWITCH_TO_CURRENCY:
      return false
    case EXCHANGE_REQUEST:
      return false
    default:
      return state
  }
}


const from = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENCIES:
      return action.currencies[0].id
    case SWITCH_FROM_CURRENCY:
      return action.from.id
    case SWITCH_TO_CURRENCY:
      return action.from.id
    default:
      return state
  }
}

const to = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENCIES:
      return action.currencies[1].id
    case SWITCH_FROM_CURRENCY:
      return action.to.id
    case SWITCH_TO_CURRENCY:
      return action.to.id
    default:
      return state
  }
}

const input = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_OUTPUT:
      return action.currency.input
    case EXCHANGE_SUCCESS:
      return 0
    default:
      return state
  }
}

const output = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_OUTPUT:
      return parseFloat((action.currency.input * action.currency.rate).toFixed(2))
    case RECEIVE_RATES:
      return parseFloat((action.input * action.rates[action.to]).toFixed(2))
    case EXCHANGE_SUCCESS:
      return 0
    default:
      return state
  }
}

export default combineReducers({
  list,
  isFromOpened,
  isToOpened,
  from,
  to,
  input,
  output
})

export const getCurrency = (type, id) => type[id] || {}

export const getCurrenciesList = state => Object.values(state)

export const getFormattedValue = input => {
  let value = input.replace(/[\-\[\]\s()<>{}"'`|/,;:~+=_!?@#£$€%^&*A-Za-zА-Яа-я]/g, '')

  const nulls = input.match(/[0]/g)
  if (nulls && nulls.length > 0) {
    value = value.replace(/^0+(?=[0-9])/g, '')
  }

  const dots = input.match(/[.]/g)
  if (dots && dots.length > 1) {
    value = value.replace(/.$/g, '')
  }
  return value
}
