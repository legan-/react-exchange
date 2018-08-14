import faker from 'faker';

const currencies = [
  {
    name: 'USD',
    sign: '$',
  },
  {
    name: 'GBP',
    sign: '£',
  },
  {
    name: 'EUR',
    sign: '€',
  },
];

export default currencies.map((currency, i) =>
  Object.assign(currency, {
    id: i,
    value: faker.random
      .number({ min: 0, max: 2000, precision: 0.01 })
      .toFixed(2),
  }),
);
