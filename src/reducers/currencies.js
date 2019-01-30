import { combineReducers } from 'redux';

import initialState from './initialState';
import TYPES from '../constants/ActionTypes';

const isLoading = (state = initialState.currencies.isLoading, action) => {
  switch (action.type) {
    case TYPES.RECEIVE_CURRENCIES:
      return true;
    case TYPES.CURRENCIES_RECEIVED_SUCCESS:
    case TYPES.CURRENCIES_RECEIVED_FAIL:
      return false;
    default:
      return state;
  }
};

const isReceived = (state = initialState.currencies.isReceived, action) => {
  switch (action.type) {
    case TYPES.CURRENCIES_RECEIVED_SUCCESS:
      return true;
    case TYPES.CURRENCIES_RECEIVED_FAIL:
      return false;
    default:
      return state;
  }
};

const list = (state = initialState.currencies.list, action) => {
  switch (action.type) {
    case TYPES.CURRENCIES_RECEIVED_SUCCESS:
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
    case TYPES.SHOW_BASE_DROPDOWN:
      return !state;
    case TYPES.HIDE_DROPDOWN:
    case TYPES.SHOW_QUOTE_DROPDOWN:
    case TYPES.CHANGE_BASE_CURRENCY:
    case TYPES.CHANGE_QUOTE_CURRENCY:
    case TYPES.EXCHANGE_REQUEST:
    case TYPES.UPDATE_INPUT:
      return false;
    default:
      return state;
  }
};

const isQuoteOpen = (state = initialState.currencies.isQuoteOpen, action) => {
  switch (action.type) {
    case TYPES.SHOW_QUOTE_DROPDOWN:
      return !state;
    case TYPES.HIDE_DROPDOWN:
    case TYPES.SHOW_BASE_DROPDOWN:
    case TYPES.CHANGE_BASE_CURRENCY:
    case TYPES.CHANGE_QUOTE_CURRENCY:
    case TYPES.EXCHANGE_REQUEST:
    case TYPES.UPDATE_INPUT:
      return false;
    default:
      return state;
  }
};

const base = (state = initialState.currencies.base, action) => {
  switch (action.type) {
    case TYPES.SET_CURRENCIES:
      return action.currencies[0].id;
    case TYPES.CHANGE_BASE_CURRENCY:
    case TYPES.CHANGE_QUOTE_CURRENCY:
      return action.base.id;
    default:
      return state;
  }
};

const quote = (state = initialState.currencies.quote, action) => {
  switch (action.type) {
    case TYPES.SET_CURRENCIES:
      return action.currencies[1].id;
    case TYPES.CHANGE_BASE_CURRENCY:
    case TYPES.CHANGE_QUOTE_CURRENCY:
      return action.quote.id;
    default:
      return state;
  }
};

const input = (state = initialState.currencies.input, action) => {
  switch (action.type) {
    case TYPES.UPDATE_INPUT:
      return action.input;
    case TYPES.EXCHANGE_SUCCESS:
      return initialState.currencies.input;
    default:
      return state;
  }
};

const output = (state = initialState.currencies.output, action) => {
  switch (action.type) {
    case TYPES.UPDATE_OUTPUT:
      return action.output;
    case TYPES.EXCHANGE_SUCCESS:
      return initialState.currencies.output;
    default:
      return state;
  }
};

const hasWarning = (state = initialState.currencies.hasWarning, action) => {
  switch (action.type) {
    case TYPES.UPDATE_WARNING:
      return action.warning;
    default:
      return state;
  }
};

const isSending = (state = initialState.currencies.isSending, action) => {
  switch (action.type) {
    case TYPES.EXCHANGE_REQUEST:
      return true;
    case TYPES.EXCHANGE_SUCCESS:
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
