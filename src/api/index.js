import _currencies from './currencies';
import _rates from './rates';

const TIMEOUT = 200;

const fetchRates = base =>
  new Promise((resolve, reject) => setTimeout(() => resolve(_rates(base)), TIMEOUT));

const fetchCurrencies = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve(_currencies), TIMEOUT));

const exchange = request =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(true);
    }, TIMEOUT * 3)
  );

export default {
  fetchRates,
  fetchCurrencies,
  exchange
};
