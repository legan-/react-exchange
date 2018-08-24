import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrency } from '../../selectors/currencies';

const Rate = ({ rate, fromSign, toSign }) => (
  <div className="rate-container">
    <div className="rate">
      {fromSign}1 = {toSign}
      {rate.slice(0, 4)}
      <span>{rate.slice(-2)}</span>
    </div>
  </div>
);

Rate.propTypes = {
  rate: PropTypes.string.isRequired,
  fromSign: PropTypes.string,
  toSign: PropTypes.string
};

const mapStateToProps = state => {
  // put logic in here ?
  return {
    rate: state.rates.rate || '0',
    fromSign: getCurrency(state.currencies.list, state.currencies.from).sign,
    toSign: getCurrency(state.currencies.list, state.currencies.to).sign
  };
};

export default connect(mapStateToProps)(Rate);
