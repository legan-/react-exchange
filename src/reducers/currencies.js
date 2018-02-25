import { combineReducers } from 'redux';

import Types from '../constants/ActionTypes';


const list = (state = {}, action) => {
  switch (action.type) {
    case Types.RECEIVE_CURRENCIES:
      return {
        ...state,
        ...action.currencies.reduce((obj, currency) => {
          obj[currency.id] = currency;
          return obj;
        }, {})
      }
    default:
      return state;
  }
}

const isFromOpened = (state = false, action) => {
  switch (action.type) {
    case Types.TOGGLE_FROM_DROPDOWN:
      return !state;
    case Types.TOGGLE_TO_DROPDOWN:
    case Types.CHANGE_FROM_CURRENCY:
    case Types.CHANGE_TO_CURRENCY:
    case Types.EXCHANGE_REQUEST:
    case Types.UPDATE_INPUT:
      return false;
    default:
      return state;
  }
}

const isToOpened = (state = false, action) => {
  switch (action.type) {
    case Types.TOGGLE_TO_DROPDOWN:
      return !state;
    case Types.TOGGLE_FROM_DROPDOWN:
    case Types.CHANGE_FROM_CURRENCY:
    case Types.CHANGE_TO_CURRENCY:
    case Types.EXCHANGE_REQUEST:
    case Types.UPDATE_INPUT:
      return false;
    default:
      return state;
  }
}


const from = (state = null, action) => {
  switch (action.type) {
    case Types.SET_CURRENCIES:
      return action.currencies[0].id;
    case Types.CHANGE_FROM_CURRENCY:
    case Types.CHANGE_TO_CURRENCY:
      return action.base.id;
    default:
      return state;
  }
}

const to = (state = null, action) => {
  switch (action.type) {
    case Types.SET_CURRENCIES:
      return action.currencies[1].id;
    case Types.CHANGE_FROM_CURRENCY:
    case Types.CHANGE_TO_CURRENCY:
      return action.quote.id;
    default:
      return state;
  }
}

const input = (state = '', action) => {
  switch (action.type) {
    case Types.UPDATE_INPUT:
      return action.input;
    case Types.EXCHANGE_SUCCESS:
      return '';
    default:
      return state;
  }
}

const output = (state = 0, action) => {
  switch (action.type) {
    case Types.UPDATE_OUTPUT:
    case Types.RECEIVE_RATES:
      return action.output;
    case Types.EXCHANGE_SUCCESS:
      return 0;
    default:
      return state;
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
});

export const getCurrency = (type, id) => type[id] || {}

export const getCurrenciesList = state => Object.values(state);

export const getFormattedInput = input => {

  let value = input.replace(/[-[\]\s()<>{}"'`|/,;:~+=_!?@#£$€%^&*A-Za-zА-Яа-я]/g, '');

  const nulls = input.match(/[0]/g);
  if (nulls && nulls.length > 0) {
    value = value.replace(/^0+(?=[0-9])/g, '');
  }

  const dots = input.match(/[.]/g);
  if (dots && dots.length > 1) {
    value = value.replace(/.$/g, '');
  }

  return value;
}

export const getFormattedOutput = state => input =>
  parseFloat((input * state.rates.rate).toFixed(2));
