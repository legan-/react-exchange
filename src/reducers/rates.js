import { combineReducers } from 'redux';

import {
  RECEIVE_RATES,
  CHANGE_FROM_CURRENCY,
  CHANGE_TO_CURRENCY
} from '../constants/ActionTypes';


const rate = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_RATES:
      return action.rate;
    default:
      return state;
  }
}

const update = (state = new Date().getTime(), action) => {
  switch (action.type) {
    case CHANGE_FROM_CURRENCY:
      return new Date().getTime();
    case CHANGE_TO_CURRENCY:
      return new Date().getTime();
    default:
      return state;
  }
}

const list = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RATES:
      return {
        ...action.rates
      }
    default:
      return state;
  }
}

export default combineReducers({
  rate,
  update,
  list
});

export const getRate = state => state.rate || '0';