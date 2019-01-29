import api from '../api';
import { startRateListener } from './rates';
import { checkBalance } from './input';
import * as actions from './actionCreators';
import { BASE, QUOTE } from '../constants/DataTypes';

const setReceivedCurrencies = data => dispatch => {
  const currencyLength = Object.keys(data).length;

  if (currencyLength < 2) {
    dispatch(actions.hasFewCurrencies(data));
  } else {
    dispatch(actions.setCurrencies(data));
    dispatch(startRateListener());
  }
};

export const getCurrencies = () => dispatch => {
  dispatch(actions.receiveCurrencies());

  api
    .fetchCurrencies()
    .then(data => {
      dispatch(actions.currenciesReceivedSuccess(data));
      dispatch(setReceivedCurrencies(data));
    })
    .catch(error => {
      dispatch(actions.currenciesReceivedFail());
      console.error(error);
    });
};

const switchCurrencyBy = (id, type, state) => {
  const { base, quote, list } = state.currencies;
  const time = new Date().getTime();
  switch (type) {
    case BASE:
      const t = quote === id ? list[base] : list[quote];
      return actions.changeBaseCurrency(list[id], t, state, time);
    case QUOTE:
      const f = base === id ? list[quote] : list[base];
      return actions.changeQuoteCurrency(f, list[id], state, time);
    // no default
  }
};

export const switchCurrency = (id, type) => (dispatch, getState) => {
  dispatch(switchCurrencyBy(id, type, getState()));
  dispatch(checkBalance());
  dispatch(startRateListener());
};
