import _currencies from './currencies';
import _rates from './rates';

const TIMEOUT = 200;

const fetchRates = base =>
  new Promise(resolve => setTimeout(() => resolve(_rates(base)), TIMEOUT));

const fetchCurrencies = () =>
  new Promise(resolve => setTimeout(() => resolve(_currencies), TIMEOUT));

const exchange = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
    }, TIMEOUT * 3)
  );

export default {
  fetchRates,
  fetchCurrencies,
  exchange
};
