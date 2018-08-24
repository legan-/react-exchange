import { combineReducers } from 'redux';

import initialState from './initialState';
import Types from '../constants/ActionTypes';

const list = (state = initialState.currencies.list, action) => {
  switch (action.type) {
    case Types.RECEIVE_CURRENCIES_SUCCESS:
      return {
        ...state,
        ...action.currencies.reduce((obj, currency) => {
          obj[currency.id] = currency;
          return obj;
        }, {})
      };
    default:
      return state;
  }
};

const isFromOpen = (state = initialState.currencies.isFromOpen, action) => {
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
};

const isToOpen = (state = initialState.currencies.isToOpen, action) => {
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
};

const from = (state = initialState.currencies.from, action) => {
  switch (action.type) {
    case Types.SET_CURRENCIES:
      return action.currencies[0].id;
    case Types.CHANGE_FROM_CURRENCY:
    case Types.CHANGE_TO_CURRENCY:
      return action.base.id;
    default:
      return state;
  }
};

const to = (state = initialState.currencies.to, action) => {
  switch (action.type) {
    case Types.SET_CURRENCIES:
      return action.currencies[1].id;
    case Types.CHANGE_FROM_CURRENCY:
    case Types.CHANGE_TO_CURRENCY:
      return action.quote.id;
    default:
      return state;
  }
};

const input = (state = initialState.currencies.input, action) => {
  switch (action.type) {
    case Types.UPDATE_INPUT:
      return action.input;
    case Types.EXCHANGE_SUCCESS:
      return '';
    default:
      return state;
  }
};

const output = (state = initialState.currencies.output, action) => {
  switch (action.type) {
    case Types.UPDATE_OUTPUT:
      return action.output;
    case Types.EXCHANGE_SUCCESS:
      return initialState.currencies.input;
    default:
      return state;
  }
};

const warning = (state = initialState.currencies.warning, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const sending = (state = initialState.currencies.sending, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  list,
  isFromOpen,
  isToOpen,
  from,
  to,
  input,
  output,
  warning,
  sending
});
