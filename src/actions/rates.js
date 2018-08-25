import api from '../api';
import * as actions from './actionCreators';
import { calcAndUpdateOutput } from './output';

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

export const startRateListener = () => (dispatch, getState) => {
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
