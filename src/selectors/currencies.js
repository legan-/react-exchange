const getCurrency = (type, id) => type[id] || {};

const getCurrenciesList = state => Object.values(state);

const getFormattedOutput = state => input => parseFloat((input * state.rates.rate).toFixed(2));

export { getCurrency, getCurrenciesList, getFormattedOutput };
