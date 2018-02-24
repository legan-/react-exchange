import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRate } from '../reducers/rates';
import { getCurrency } from '../reducers/currencies';


const Rate = ({ rate, from, to }) => {
  let formattedRate;

  if (rate.length) {
    formattedRate = (
      <div>
        { rate.slice(0,4) }
        <span>
          { rate.slice(-2) }
        </span>
      </div>
    );
  }
  return (
    <div
      className='rate-container'
    >
      <div
        className='rate'
      >
        <div>
          { from }1 = { to }
        </div>
        { formattedRate }
      </div>
    </div>
  );
}

Rate.propTypes = {
  rate: PropTypes.string,
  from: PropTypes.string,
  to:   PropTypes.string
}

const mapStateToProps = (state) => ({
  rate: getRate(state.rates),
  from: getCurrency(state.currencies.list, state.currencies.from).sign,
  to:   getCurrency(state.currencies.list, state.currencies.to).sign,
});

export default connect(
  mapStateToProps
)(Rate);