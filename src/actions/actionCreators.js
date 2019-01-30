import TYPES from '../constants/ActionTypes';

export const receiveCurrencies = () => ({
  type: TYPES.RECEIVE_CURRENCIES
});

export const currenciesReceivedSuccess = currencies => ({
  type: TYPES.CURRENCIES_RECEIVED_SUCCESS,
  currencies
});

export const currenciesReceivedFail = () => ({
  type: TYPES.CURRENCIES_RECEIVED_FAIL
});

export const ratesReceivedSuccess = (rates, rate) => ({
  type: TYPES.RATES_RECEIVED_SUCCESS,
  rates,
  rate
});

export const hasFewCurrencies = currencies => ({
  type: TYPES.HAS_FEW_CURRENCIES,
  currencies
});

export const setCurrencies = currencies => ({
  type: TYPES.SET_CURRENCIES,
  currencies
});

export const updateInput = input => ({
  type: TYPES.UPDATE_INPUT,
  input
});

export const updateOutput = output => ({
  type: TYPES.UPDATE_OUTPUT,
  output
});

export const showBaseDropdown = () => ({
  type: TYPES.SHOW_BASE_DROPDOWN
});

export const showQuoteDropdown = () => ({
  type: TYPES.SHOW_QUOTE_DROPDOWN
});

export const hideDropdown = () => ({
  type: TYPES.HIDE_DROPDOWN
});

export const changeBaseCurrency = (base, quote, state, time) => ({
  type: TYPES.CHANGE_BASE_CURRENCY,
  base,
  quote,
  state,
  time
});

export const changeQuoteCurrency = (base, quote, state, time) => ({
  type: TYPES.CHANGE_QUOTE_CURRENCY,
  base,
  quote,
  state,
  time
});

export const updateWarning = warning => ({
  type: TYPES.UPDATE_WARNING,
  warning
});

export const exchangeRequest = () => ({
  type: TYPES.EXCHANGE_REQUEST
});

export const exchangeSuccess = () => ({
  type: TYPES.EXCHANGE_SUCCESS
});

export const exchangeError = () => ({
  type: TYPES.EXCHANGE_ERROR
});
