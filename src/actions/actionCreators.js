import Types from '../constants/ActionTypes';

const recieveCurrenciesSuccess = currencies => ({
  type: Types.RECEIVE_CURRENCIES_SUCCESS,
  currencies
});

const receiveRatesSuccess = (rates, rate) => ({
  type: Types.RECEIVE_RATES_SUCCESS,
  rates,
  rate
});

const hasFewCurrencies = currencies => ({
  type: Types.HAS_FEW_CURRENCIES,
  currencies
});

const setCurrencies = currencies => ({
  type: Types.SET_CURRENCIES,
  currencies
});

const updateInput = input => ({
  type: Types.UPDATE_INPUT,
  input
});

const updateOutput = output => ({
  type: Types.UPDATE_OUTPUT,
  output
});

const toggleFromDropdown = () => ({
  type: Types.TOGGLE_FROM_DROPDOWN
});

const toggleToDropdown = () => ({
  type: Types.TOGGLE_TO_DROPDOWN
});

const changeFromCurrency = (base, quote, state, time) => ({
  type: Types.CHANGE_FROM_CURRENCY,
  base,
  quote,
  state,
  time
});

const changeToCurrency = (base, quote, state, time) => ({
  type: Types.CHANGE_TO_CURRENCY,
  base,
  quote,
  state,
  time
});

const exchangeRequest = () => ({
  type: Types.EXCHANGE_REQUEST
});

const exchangeSuccess = () => ({
  type: Types.EXCHANGE_SUCCESS
});

const exchangeError = () => ({
  type: Types.EXCHANGE_ERROR
});

export {
  recieveCurrenciesSuccess,
  receiveRatesSuccess,
  hasFewCurrencies,
  setCurrencies,
  updateInput,
  updateOutput,
  toggleFromDropdown,
  toggleToDropdown,
  changeFromCurrency,
  changeToCurrency,
  exchangeRequest,
  exchangeSuccess,
  exchangeError
};
