import * as actions from './actionCreators';

import internal from '../api/internal';

import {
  CURRENCIES,
  RATES,
  FROM,
  TO
} from '../constants/DataTypes';


const shouldGenerateRandomRate = (currencies, rates, random) => {
  const generateRandom = () => {
    const name = currencies.list[currencies.to].name;
    const value = ((rates[name]) + Math.random()/30).toFixed(6);
    return { ...rates, [name]: Number(value) }
  }
  return random ? generateRandom() : rates;
}

const receive = (type, data, state = {}) => {
  switch (type) {
    case CURRENCIES:
      return actions.recieveCurrencies(data);
    case RATES:
      // [!] replace "true" with "false" to disable fake rate's generation
      const random = true;
      const rates = shouldGenerateRandomRate(state.currencies, data.rates, random);

      const input = state.currencies.input;
      const quoteId = state.currencies.to;
      const quoteName = state.currencies.list[quoteId].name;
      const rate = rates[quoteName].toFixed(4);
      const output = Number((input * rate).toFixed(2));

      return actions.receiveRates(output, rates, rate);
    // no default
  }
}

const getRates = (base) => (dispatch, getState) =>
  fetch(`http://api.fixer.io/latest?base=${ base }&symbols=USD,GBP,EUR,RUB`)
  .then(response => response.json())
  .then(json => {
    if (json) {
      dispatch(receive(RATES, json, getState()));
    }
  });

const startListener = () => (dispatch, getState) => {
  const update = (time) => {
    const base = getState().currencies.list[getState().currencies.from].name;

    dispatch(getRates(base));
    setTimeout(() => {
      if (getState().rates.update === time) {
        update(getState().rates.update);
      }
    }, 10000)
  }
  update(getState().rates.update);
}

const setReceivedCurrencies = data => dispatch => {
  const length = Object.keys(data).length;

  if (length < 2) {
    dispatch(actions.hasFewCurrencies(data));
  } else {
    dispatch(actions.setCurrencies(data));
    dispatch(startListener());
  }
}

export const getCurrencies = () => dispatch => {
  internal.getData(data => {
    dispatch(receive(CURRENCIES, data));
    dispatch(setReceivedCurrencies(data));
  })
}

const toggleBy = type => {
  switch (type) {
    case FROM:
      return actions.toggleFromDropdown();
    case TO:
      return actions.toggleToDropdown();
    // no default
  }
}

export const toggleDropdown = type => dispatch =>
  dispatch(toggleBy(type));

const switchCurrencyBy = (id, type, state) => {
  const c = state.currencies;
  const time = new Date().getTime();
  switch (type) {
    case FROM:
      const to = c.to === id ? c.list[c.from] : c.list[c.to];
      return actions.changeFromCurrency(c.list[id], to, state, time);
    case TO:
      const from = c.from === id ? c.list[c.to] : c.list[c.from];
      return actions.changeToCurrency(from, c.list[id], state, time);
    // no default
  }
}

export const switchCurrency = (id, type) => (dispatch, getState) => {
  dispatch(switchCurrencyBy(id, type, getState()));
  dispatch(startListener());
}

export const exchange = () => (dispatch, getState) => {
  const c = getState().currencies
  const request = {
    from: {
      currencyId: c.from,
      value:      c.input
    },
    to: {
      currencyId: c.to,
      value:      c.output
    }
  }

  dispatch(actions.exchangeRequest());

  internal.exchange(request, response => {

    if (response) {
      dispatch(actions.exchangeSuccess());
    } else {
      dispatch(actions.exchangeError());
    }
  })
}
