import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrency } from '../../selectors/currencies';

const Rate = ({ rate, baseSign, quoteSign }) => (
  <div className="rate-container">
    <div className="rate">
      {baseSign}1 = {quoteSign}
      {rate.slice(0, 4)}
      <span>{rate.slice(-2)}</span>
    </div>
  </div>
);

Rate.propTypes = {
  rate: PropTypes.string.isRequired,
  baseSign: PropTypes.string,
  quoteSign: PropTypes.string
};

const mapStateToProps = state => {
  // put logic in here ?
  return {
    rate: state.rates.rate || '0',
    baseSign: getCurrency(state.currencies.list, state.currencies.base).sign,
    quoteSign: getCurrency(state.currencies.list, state.currencies.quote).sign
  };
};

export default connect(mapStateToProps)(Rate);
