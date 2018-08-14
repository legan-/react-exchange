import { combineReducers } from 'redux';

import Types from '../constants/ActionTypes';

const rate = (state = null, action) => {
  switch (action.type) {
    case Types.RECEIVE_RATES:
      return action.rate;
    default:
      return state;
  }
};

const update = (state = new Date().getTime(), action) => {
  switch (action.type) {
    case Types.CHANGE_FROM_CURRENCY:
    case Types.CHANGE_TO_CURRENCY:
      return action.time;
    default:
      return state;
  }
};

const list = (state = {}, action) => {
  switch (action.type) {
    case Types.RECEIVE_RATES:
      return {
        ...action.rates,
      };
    default:
      return state;
  }
};

export default combineReducers({
  rate,
  update,
  list,
});

const getRate = state => state.rate || '0';

export { getRate };
