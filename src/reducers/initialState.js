export default {
  currencies: {
    list: {},
    isBaseOpen: false,
    isQuoteOpen: false,
    base: null,
    quote: null,
    input: '0',
    output: 0,
    warning: false,
    sending: false
  },
  rates: {
    rate: null,
    updatedAt: new Date().getTime(),
    list: {}
  }
};
