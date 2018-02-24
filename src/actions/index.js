import getJSON from 'get-json';

import internal from '../api/internal';
import * as types from '../constants/ActionTypes';

import {
  CURRENCIES,
  RATES,
  FROM,
  TO
} from '../constants/DataTypes';


const recieveCurrencies = currencies => ({
  type: types.RECEIVE_CURRENCIES,
  currencies
});

const receiveRates = (rates, state) => {
  const input = state.currencies.input;
  const quoteId = state.currencies.to;
  const quoteName = state.currencies.list[quoteId].name;
  const rate = rates[quoteName].toFixed(4);

  return {
    type:   types.RECEIVE_RATES,
    rates,
    output: Number((input * rate).toFixed(2)),
    rate
  }
}

const hasFewCurrencies = currencies => ({
  type: types.HAS_FEW_CURRENCIES,
  currencies
});

const setCurrencies = currencies => ({
  type: types.SET_CURRENCIES,
  currencies
});

export const updateInput = input => ({
  type: types.UPDATE_INPUT,
  input: Number(input)
});

export const updateOutput = output => ({
  type: types.UPDATE_OUTPUT,
  output
});

const toggleFromDropdown = () => ({
  type: types.TOGGLE_FROM_DROPDOWN
});

const toggleToDropdown = () => ({
  type: types.TOGGLE_TO_DROPDOWN
});

const changeFromCurrency = (base, quote, state) => ({
  type: types.CHANGE_FROM_CURRENCY,
  base,
  quote,
  state
});

const changeToCurrency = (base, quote, state) => ({
  type: types.CHANGE_TO_CURRENCY,
  base,
  quote,
  state
});

const exchangeRequest = () => ({
  type: types.EXCHANGE_REQUEST
});

const exchangeSuccess = () => ({
  type: types.EXCHANGE_SUCCESS
});

const exchangeError = () => ({
  type: types.EXCHANGE_ERROR
});

const shouldGenerateRandomRate = (currencies, rates, random) => {
  const generateRandom = () => {
    const name = currencies.list[currencies.to].name
    const value = ((rates[name]) + Math.random()/30).toFixed(6)
    return { ...rates, [name]: Number(value) }
  }
  return random ? generateRandom() : rates
}

const receive = (type, data, state = {}) => {
  switch (type) {
    case CURRENCIES:
      return recieveCurrencies(data)

    case RATES:
      // [!] replace "true" with "false" to disable fake rate's generation
      const random = true;
      const rates = shouldGenerateRandomRate(state.currencies, data.rates, random)
      return receiveRates(rates, state)

    // no default
  }
}

const getRates = (base) => (dispatch, getState) =>
  getJSON(`http://api.fixer.io/latest?base=${ base }&symbols=USD,GBP,EUR,RUB`, (err, res) => {
    if (res) {
      dispatch(receive(RATES, res, getState()))
    }
  });

const startListener = () => (dispatch, getState) => {
  const update = (time) => {
    const base = getState().currencies.list[getState().currencies.from].name

    dispatch(getRates(base))
    setTimeout(() => {
      if (getState().rates.update === time) {
        update(getState().rates.update)
      }
    }, 10000)
  }
  update(getState().rates.update)
}

const setReceivedCurrencies = data => dispatch => {
  const length = Object.keys(data).length

  if (length < 2) {
    dispatch(hasFewCurrencies(data))
  } else {
    dispatch(setCurrencies(data))
    dispatch(startListener())
  }
}

export const getCurrencies = () => dispatch => {
  internal.getData(data => {
    dispatch(receive(CURRENCIES, data))
    dispatch(setReceivedCurrencies(data))
  })
}

const toggleBy = type => {
  switch (type) {
    case FROM:
      return toggleFromDropdown()
    case TO:
      return toggleToDropdown()
    // no default
  }
}

export const toggleDropdown = type => dispatch =>
  dispatch(toggleBy(type));

const switchCurrencyBy = (id, type, state) => {
  const c = state.currencies
  switch (type) {
    case FROM:
      const to = c.to === id ? c.list[c.from] : c.list[c.to]
      return changeFromCurrency(c.list[id], to, state)
    case TO:
      const from = c.from === id ? c.list[c.to] : c.list[c.from]
      return changeToCurrency(from, c.list[id], state)
    // no default
  }
}

export const switchCurrency = (id, type) => (dispatch, getState) => {
  dispatch(switchCurrencyBy(id, type, getState()))
  dispatch(startListener())
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

  dispatch(exchangeRequest())

  internal.exchange(request, response => {

    if (response) {
      dispatch(exchangeSuccess())
    } else {
      dispatch(exchangeError())
    }
  })
}
