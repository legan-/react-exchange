import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TO } from '../../constants/DataTypes';

import Currency from '../../components/common/Currency';
import Rate from './Rate';
import Dropdown from '../Dropdown/';
import Exchange from './Exchange';

import { toggleDropdown } from '../../actions';
import { getCurrency, getCurrenciesList } from '../../selectors/currencies';

const To = ({ currency, currenciesList, output, onCurrencyClick, isDropdownActive }) => (
  <div className="block to-block">
    <Rate />
    <div className="control">
      <Currency
        name={currency.name}
        sign={currency.sign}
        value={currency.value}
        warning={false}
        onCurrencyClick={onCurrencyClick}
      />
      <div className="output">{output ? `+ ${output}` : 0}</div>
    </div>
    <Dropdown list={currenciesList} active={isDropdownActive} type={TO} />
    <Exchange />
  </div>
);

To.propTypes = {
  currency: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sign: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  currenciesList: PropTypes.array.isRequired,
  output: PropTypes.number.isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  isDropdownActive: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  currency: getCurrency(state.currencies.list, state.currencies.to),
  currenciesList: getCurrenciesList(state.currencies.list),
  isDropdownActive: state.currencies.isToOpen,
  output: state.currencies.output
});

const mapDispatchToProps = dispatch => ({
  onCurrencyClick: () => dispatch(toggleDropdown(TO))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(To);
