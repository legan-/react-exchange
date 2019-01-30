import { combineReducers } from 'redux';

import initialState from './initialState';
import Types from '../constants/ActionTypes';

const isLoading = (state = initialState.currencies.isLoading, action) => {
  switch (action.type) {
    case Types.RECEIVE_CURRENCIES:
      return true;
    case Types.CURRENCIES_RECEIVED_SUCCESS:
    case Types.CURRENCIES_RECEIVED_FAIL:
      return false;
    default:
      return state;
  }
};

const isReceived = (state = initialState.currencies.isReceived, action) => {
  switch (action.type) {
    case Types.CURRENCIES_RECEIVED_SUCCESS:
      return true;
    case Types.CURRENCIES_RECEIVED_FAIL:
      return false;
    default:
      return state;
  }
};

const list = (state = initialState.currencies.list, action) => {
  switch (action.type) {
    case Types.CURRENCIES_RECEIVED_SUCCESS:
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

const isBaseOpen = (state = initialState.currencies.isBaseOpen, action) => {
  switch (action.type) {
    case Types.SHOW_BASE_DROPDOWN:
      return !state;
    case Types.HIDE_DROPDOWN:
    case Types.SHOW_QUOTE_DROPDOWN:
    case Types.CHANGE_BASE_CURRENCY:
    case Types.CHANGE_QUOTE_CURRENCY:
    case Types.EXCHANGE_REQUEST:
    case Types.UPDATE_INPUT:
      return false;
    default:
      return state;
  }
};

const isQuoteOpen = (state = initialState.currencies.isQuoteOpen, action) => {
  switch (action.type) {
    case Types.SHOW_QUOTE_DROPDOWN:
      return !state;
    case Types.HIDE_DROPDOWN:
    case Types.SHOW_BASE_DROPDOWN:
    case Types.CHANGE_BASE_CURRENCY:
    case Types.CHANGE_QUOTE_CURRENCY:
    case Types.EXCHANGE_REQUEST:
    case Types.UPDATE_INPUT:
      return false;
    default:
      return state;
  }
};

const base = (state = initialState.currencies.base, action) => {
  switch (action.type) {
    case Types.SET_CURRENCIES:
      return action.currencies[0].id;
    case Types.CHANGE_BASE_CURRENCY:
    case Types.CHANGE_QUOTE_CURRENCY:
      return action.base.id;
    default:
      return state;
  }
};

const quote = (state = initialState.currencies.quote, action) => {
  switch (action.type) {
    case Types.SET_CURRENCIES:
      return action.currencies[1].id;
    case Types.CHANGE_BASE_CURRENCY:
    case Types.CHANGE_QUOTE_CURRENCY:
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
      return initialState.currencies.input;
    default:
      return state;
  }
};

const output = (state = initialState.currencies.output, action) => {
  switch (action.type) {
    case Types.UPDATE_OUTPUT:
      return action.output;
    case Types.EXCHANGE_SUCCESS:
      return initialState.currencies.output;
    default:
      return state;
  }
};

const hasWarning = (state = initialState.currencies.hasWarning, action) => {
  switch (action.type) {
    case Types.UPDATE_WARNING:
      return action.warning;
    default:
      return state;
  }
};

const isSending = (state = initialState.currencies.isSending, action) => {
  switch (action.type) {
    case Types.EXCHANGE_REQUEST:
      return true;
    case Types.EXCHANGE_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isLoading,
  isReceived,
  list,
  isBaseOpen,
  isQuoteOpen,
  base,
  quote,
  input,
  output,
  hasWarning,
  isSending
});
