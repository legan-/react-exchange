import Types from '../constants/ActionTypes';


export const recieveCurrencies = currencies => ({
  type: Types.RECEIVE_CURRENCIES,
  currencies
});

export const receiveRates = (output, rates, rate) => ({
  type: Types.RECEIVE_RATES,
  output,
  rates,
  rate
});

export const hasFewCurrencies = currencies => ({
  type: Types.HAS_FEW_CURRENCIES,
  currencies
});

export const setCurrencies = currencies => ({
  type: Types.SET_CURRENCIES,
  currencies
});

export const updateInput = input => ({
  type: Types.UPDATE_INPUT,
  input
});

export const updateOutput = output => ({
  type: Types.UPDATE_OUTPUT,
  output
});

export const toggleFromDropdown = () => ({
  type: Types.TOGGLE_FROM_DROPDOWN
});

export const toggleToDropdown = () => ({
  type: Types.TOGGLE_TO_DROPDOWN
});

export const changeFromCurrency = (base, quote, state, time) => ({
  type: Types.CHANGE_FROM_CURRENCY,
  base,
  quote,
  state,
  time
});

export const changeToCurrency = (base, quote, state, time) => ({
  type: Types.CHANGE_TO_CURRENCY,
  base,
  quote,
  state,
  time
});

export const exchangeRequest = () => ({
  type: Types.EXCHANGE_REQUEST
});

export const exchangeSuccess = () => ({
  type: Types.EXCHANGE_SUCCESS
});

export const exchangeError = () => ({
  type: Types.EXCHANGE_ERROR
});