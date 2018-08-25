import React from 'react';
import PropTypes from 'prop-types';

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

export default Rate;
