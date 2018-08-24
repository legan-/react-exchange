export default {
  currencies: {
    list: {},
    isFromOpen: false,
    isToOpen: false,
    from: null,
    to: null,
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
