import Types from '../constants/ActionTypes';

export const receiveCurrencies = () => ({
  type: Types.RECEIVE_CURRENCIES
});

export const currenciesReceivedSuccess = currencies => ({
  type: Types.CURRENCIES_RECEIVED_SUCCESS,
  currencies
});

export const currenciesReceivedFail = () => ({
  type: Types.CURRENCIES_RECEIVED_FAIL
});

export const ratesReceivedSuccess = (rates, rate) => ({
  type: Types.RATES_RECEIVED_SUCCESS,
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

export const showBaseDropdown = () => ({
  type: Types.SHOW_BASE_DROPDOWN
});

export const showQuoteDropdown = () => ({
  type: Types.SHOW_QUOTE_DROPDOWN
});

export const hideDropdown = () => ({
  type: Types.HIDE_DROPDOWN
});

export const changeBaseCurrency = (base, quote, state, time) => ({
  type: Types.CHANGE_BASE_CURRENCY,
  base,
  quote,
  state,
  time
});

export const changeQuoteCurrency = (base, quote, state, time) => ({
  type: Types.CHANGE_QUOTE_CURRENCY,
  base,
  quote,
  state,
  time
});

export const updateWarning = warning => ({
  type: Types.UPDATE_WARNING,
  warning
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
