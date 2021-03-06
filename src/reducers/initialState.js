export default {
  currencies: {
    isLoading: false,
    isReceived: false,
    list: {},
    isBaseOpen: false,
    isQuoteOpen: false,
    base: null,
    quote: null,
    input: '0',
    output: 0,
    hasWarning: false,
    isSending: false
  },
  rates: {
    rate: null,
    updatedAt: new Date().getTime(),
    list: {}
  }
};
