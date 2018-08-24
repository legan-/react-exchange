import * as actions from './actionCreators';

import api from '../api';

import { FROM, TO } from '../constants/DataTypes';

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
        const quoteId = getState().currencies.to;
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
    const base = getState().currencies.list[getState().currencies.from].name;

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
  dispatch(startRateListener());
};

const submitExchange = () => (dispatch, getState) => {
  const { from, to, input, output } = getState().currencies;
  const request = {
    from: {
      currencyId: from,
      value: input
    },
    to: {
      currencyId: to,
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
