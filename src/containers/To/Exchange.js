import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrency } from '../../reducers/currencies';
import { submitExchange } from '../../actions';

const Exchange = ({ inputValue, balance, onExchangeClick }) => (
  <div className="exchange-container">
    <button
      className="exchange-btn"
      onClick={onExchangeClick}
      disabled={
        inputValue === '0' ||
        inputValue === '' ||
        Number(inputValue) > Number(balance)
          ? 'disabled'
          : ''
      }>
      Exchange
    </button>
  </div>
);

Exchange.propTypes = {
  inputValue: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  onExchangeClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  inputValue: state.currencies.input,
  balance:
    getCurrency(state.currencies.list, state.currencies.from).value || '0',
});

const mapDispatchToProps = dispatch => ({
  onExchangeClick: () => dispatch(submitExchange()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Exchange);
