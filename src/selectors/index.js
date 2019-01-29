const getCurrency = (list, name) => list[name] || {};

const getCurrenciesList = state => Object.values(state);

const getFormattedOutput = state => input => parseFloat((input * state.rates.rate).toFixed(2));

const parseInput = value => value === '0' ? '' : `-${ value }`;

const parseOutput = value => `${ parseInt(value, 10) > 0 ? '+' : '' } ${ value }`;

const pickBtnText = isSending => isSending ? 'Sending...' : 'Exchange';

export {
  getCurrency,
  getCurrenciesList,
  getFormattedOutput,
  parseInput,
  parseOutput,
  pickBtnText
};
