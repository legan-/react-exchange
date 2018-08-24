import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrency } from '../../selectors/currencies';
import { submitExchange } from '../../actions';

const Exchange = ({ disabled, onExchangeClick }) => (
  <div className="exchange-container">
    <button className="exchange-btn" disabled={disabled} onClick={onExchangeClick}>
      Exchange
    </button>
  </div>
);

Exchange.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onExchangeClick: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const inputValue = state.currencies.input;
  const balance = getCurrency(state.currencies.list, state.currencies.from).value || '0';

  const disabled = inputValue === '0' || Number(inputValue) > Number(balance) ? true : false;

  return {
    inputValue,
    disabled
  };
};

const mapDispatchToProps = dispatch => ({
  onExchangeClick: () => dispatch(submitExchange())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exchange);
