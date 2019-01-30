import { combineReducers } from 'redux';

import initialState from './initialState';
import TYPES from '../constants/ActionTypes';

const rate = (state = initialState.rates.rate, action) => {
  switch (action.type) {
    case TYPES.RATES_RECEIVED_SUCCESS:
      return action.rate;
    default:
      return state;
  }
};

const updatedAt = (state = initialState.rates.updatedAt, action) => {
  switch (action.type) {
    case TYPES.CHANGE_BASE_CURRENCY:
    case TYPES.CHANGE_QUOTE_CURRENCY:
      return action.time;
    default:
      return state;
  }
};

const list = (state = initialState.rates.list, action) => {
  switch (action.type) {
    case TYPES.RATES_RECEIVED_SUCCESS:
      return {
        ...action.rates
      };
    default:
      return state;
  }
};

export default combineReducers({
  rate,
  updatedAt,
  list
});
