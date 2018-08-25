import api from '../api';
import * as actions from './actionCreators';

export const submitExchange = () => (dispatch, getState) => {
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
