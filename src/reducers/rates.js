import { combineReducers } from 'redux';

import initialState from './initialState';
import Types from '../constants/ActionTypes';

const rate = (state = initialState.rates.rate, action) => {
  switch (action.type) {
    case Types.RECEIVE_RATES_SUCCESS:
      return action.rate;
    default:
      return state;
  }
};

const updatedAt = (state = initialState.rates.updatedAt, action) => {
  switch (action.type) {
    case Types.CHANGE_FROM_CURRENCY:
    case Types.CHANGE_TO_CURRENCY:
      return action.time;
    default:
      return state;
  }
};

const list = (state = initialState.rates.list, action) => {
  switch (action.type) {
    case Types.RECEIVE_RATES_SUCCESS:
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
