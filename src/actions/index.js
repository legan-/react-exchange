import * as actions from './actionCreators';

import api from '../api';

import { BASE, QUOTE } from '../constants/DataTypes';

const calcAndUpdateOutput = () => (dispatch, getState) => {
  const rate = getState().rates.rate;
  const input = getState().currencies.input;
  const output = Number((input * rate).toFixed(2));
  dispatch(actions.updateOutput(output));
};

const getRates = base => (dispatch, getState) => {
  api
    .fetchRates(base)
    .then(data => {
      if (data) {
        const rates = data.rates;
        const quoteId = getState().currencies.quote;
        const quoteName = getState().currencies.list[quoteId].name;
        const rate = rates[quoteName].toFixed(4);
        dispatch(actions.receiveRatesSuccess(rates, rate));

        dispatch(calcAndUpdateOutput());
      }
    })
    .catch(error => {
      throw error;
    });
};

const startRateListener = () => (dispatch, getState) => {
  const update = time => {
    const base = getState().currencies.list[getState().currencies.base].name;

    dispatch(getRates(base));
    setTimeout(() => {
      if (getState().rates.updatedAt === time) {
        update(getState().rates.updatedAt);
      }
    }, 5000);
  };
  update(getState().rates.updatedAt);
};

const setReceivedCurrencies = data => dispatch => {
  const currencyLength = Object.keys(data).length;

  if (currencyLength < 2) {
    dispatch(actions.hasFewCurrencies(data));
  } else {
    dispatch(actions.setCurrencies(data));
    dispatch(startRateListener());
  }
};

const getCurrencies = () => dispatch => {
  api
    .fetchCurrencies()
    .then(data => {
      dispatch(actions.recieveCurrenciesSuccess(data));
      dispatch(setReceivedCurrencies(data));
    })
    .catch(error => {
      throw error;
    });
};

const toggleBy = type => {
  switch (type) {
    case BASE:
      return actions.toggleBaseDropdown();
    case QUOTE:
      return actions.toggleQuoteDropdown();
    // no default
  }
};

const toggleDropdown = type => dispatch => dispatch(toggleBy(type));

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

const switchCurrency = (id, type) => (dispatch, getState) => {
  dispatch(switchCurrencyBy(id, type, getState()));
  dispatch(startRateListener());
};

const submitExchange = () => (dispatch, getState) => {
  const { base, quote, input, output } = getState().currencies;
  const request = {
    base: {
      currencyId: base,
      value: input
    },
    quote: {
      currencyId: quote,
      value: output
    }
  };

  dispatch(actions.exchangeRequest());

  api
    .exchange(request)
    .then(response => {
      if (response) {
        dispatch(actions.exchangeSuccess());
      } else {
        dispatch(actions.exchangeError());
      }
    })
    .catch(error => {
      throw error;
    });
};

const formattedInput = input => {
  let value = input.replace(/[-[\]\s()<>{}"'`|/,;:~+=_!?@#£$€%^&*A-Za-zА-Яа-я]/g, '');

  const nulls = input.match(/[0]/g);
  if (nulls && nulls.length > 0) {
    value = value.replace(/^0+(?=[0-9])/g, '');
  }

  const dots = input.match(/[.]/g);
  if (dots && dots.length > 1) {
    value = value.replace(/.$/g, '');
  }

  return value || '0';
};

const onInputChange = e => (dispatch, getState) => {
  const value = e.target.value;
  const formattedValue = formattedInput(value);

  dispatch(actions.updateInput(formattedValue));
  dispatch(calcAndUpdateOutput());
};

export { getCurrencies, toggleDropdown, switchCurrency, submitExchange, onInputChange };
