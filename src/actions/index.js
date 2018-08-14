import * as actions from './actionCreators';

import api from '../api';

import { CURRENCIES, RATES, FROM, TO } from '../constants/DataTypes';

const shouldGenerateRandomRate = (currencies, rates, random) => {
  const generateRandom = () => {
    const name = currencies.list[currencies.to].name;
    const value = (rates[name] + Math.random() / 30).toFixed(6);
    return { ...rates, [name]: Number(value) };
  };
  return random ? generateRandom() : rates;
};

const receive = (type, data, state = {}) => {
  switch (type) {
    case CURRENCIES:
      return actions.recieveCurrencies(data);
    case RATES:
      // [!] replace "true" with "false" to disable fake rate's generation
      const random = true;
      const rates = shouldGenerateRandomRate(
        state.currencies,
        data.rates,
        random,
      );

      const input = state.currencies.input;
      const quoteId = state.currencies.to;
      const quoteName = state.currencies.list[quoteId].name;
      const rate = rates[quoteName].toFixed(4);
      const output = Number((input * rate).toFixed(2));

      return actions.receiveRates(output, rates, rate);
    // no default
  }
};

const getRates = base => (dispatch, getState) => {
  api.fetchRates(base).then(data => {
    if (data) {
      dispatch(receive(RATES, data, getState()));
    }
  });
};

const startListener = () => (dispatch, getState) => {
  const update = time => {
    const base = getState().currencies.list[getState().currencies.from].name;

    dispatch(getRates(base));
    setTimeout(() => {
      if (getState().rates.update === time) {
        update(getState().rates.update);
      }
    }, 10000);
  };
  update(getState().rates.update);
};

const setReceivedCurrencies = data => dispatch => {
  const length = Object.keys(data).length;

  if (length < 2) {
    dispatch(actions.hasFewCurrencies(data));
  } else {
    dispatch(actions.setCurrencies(data));
    dispatch(startListener());
  }
};

const getCurrencies = () => dispatch => {
  api.fetchCurrencies().then(data => {
    dispatch(receive(CURRENCIES, data));
    dispatch(setReceivedCurrencies(data));
  });
};

const toggleBy = type => {
  switch (type) {
    case FROM:
      return actions.toggleFromDropdown();
    case TO:
      return actions.toggleToDropdown();
    // no default
  }
};

const toggleDropdown = type => dispatch => dispatch(toggleBy(type));

const switchCurrencyBy = (id, type, state) => {
  const { from, to, list } = state.currencies;
  const time = new Date().getTime();
  switch (type) {
    case FROM:
      const t = to === id ? list[from] : list[to];
      return actions.changeFromCurrency(list[id], t, state, time);
    case TO:
      const f = from === id ? list[to] : list[from];
      return actions.changeToCurrency(f, list[id], state, time);
    // no default
  }
};

const switchCurrency = (id, type) => (dispatch, getState) => {
  dispatch(switchCurrencyBy(id, type, getState()));
  dispatch(startListener());
};

const submitExchange = () => (dispatch, getState) => {
  const { from, to, input, output } = getState().currencies;
  const request = {
    from: {
      currencyId: from,
      value: input,
    },
    to: {
      currencyId: to,
      value: output,
    },
  };

  dispatch(actions.exchangeRequest());

  api.exchange(request).then(response => {
    if (response) {
      dispatch(actions.exchangeSuccess());
    } else {
      dispatch(actions.exchangeError());
    }
  });
};

export { getCurrencies, toggleDropdown, switchCurrency, submitExchange };
