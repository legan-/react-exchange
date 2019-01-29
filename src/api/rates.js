import faker from 'faker';

const rateRanges = {
  USD: {
    GBP: {
      avg: 0.7,
      int: 0.001,
    },
    EUR: {
      avg: 0.8,
      int: 0.001,
    },
  },
  GBP: {
    USD: {
      avg: 1.3,
      int: 0.008,
    },
    EUR: {
      avg: 1.12,
      int: 0.009,
    },
  },
  EUR: {
    USD: {
      avg: 1.15,
      int: 0.008,
    },
    GBP: {
      avg: 0.89,
      int: 0.008,
    },
  },
};

const rate = (base, quote) => {
  if (base === quote) {
    return 1;
  } else {
    const { avg, int } = rateRanges[base][quote];
    return parseFloat(
      faker.random
        .number({
          min: avg - int,
          max: avg + int,
          precision: 0.000001,
        })
        .toFixed(6),
    );
  }
};

export default base => ({
  timestamp: new Date().getTime(),
  base,
  rates: Object.keys(rateRanges).reduce(
    (obj, quote, i) => ({ ...obj, [quote]: rate(base, quote) }),
    {},
  ),
});
