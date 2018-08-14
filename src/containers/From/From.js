import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FROM } from '../../constants/DataTypes';

import Currency from '../../components/common/Currency';
import Dropdown from '../Dropdown';

import { toggleDropdown } from '../../actions';
import { updateInput, updateOutput } from '../../actions/actionCreators';
import {
  getCurrency,
  getCurrenciesList,
  getFormattedInput,
  getFormattedOutput,
} from '../../reducers/currencies';

const From = ({
  currency,
  currenciesList,
  updateInputValue,
  updateOutputValue,
  onCurrencyClick,
  isDropdownActive,
  formattedInput,
  formattedOutput,
  currentInput,
}) => {
  // todo:: refactor this
  const onInputChange = e => {
    const value = e.target.value;
    const formattedValue = formattedInput(value);
    const number = Number(formattedValue);

    updateInputValue(formattedValue);

    if (value === '-' || value === '') {
      updateOutputValue(0);
    } else {
      if (
        value.split('')[1] === '0' ||
        value.length - formattedValue.length < 2
      ) {
        updateOutputValue(formattedOutput(number));
      }
    }
  };

  const warning = Number(currentInput) > Number(currency.value) ? true : false;

  const compareValues =
    currentInput === '0' || currentInput === '' ? '' : '-' + currentInput;

  return (
    <div className="block from-block">
      <div className="control">
        <Currency
          name={currency.name}
          sign={currency.sign}
          value={currency.value}
          warning={warning}
          onCurrencyClick={onCurrencyClick}
        />
        <input
          className="input"
          type="text"
          placeholder="0"
          value={compareValues}
          onChange={onInputChange}
        />
      </div>
      <Dropdown list={currenciesList} active={isDropdownActive} type={FROM} />
    </div>
  );
};

From.propTypes = {
  currency: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    sign: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  currenciesList: PropTypes.array.isRequired,
  updateInputValue: PropTypes.func.isRequired,
  updateOutputValue: PropTypes.func.isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  isDropdownActive: PropTypes.bool.isRequired,
  formattedInput: PropTypes.func.isRequired,
  formattedOutput: PropTypes.func.isRequired,
  currentInput: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currency: getCurrency(state.currencies.list, state.currencies.from),
  currenciesList: getCurrenciesList(state.currencies.list),
  isDropdownActive: state.currencies.isFromOpened,
  formattedInput: getFormattedInput,
  formattedOutput: getFormattedOutput(state),
  currentInput: state.currencies.input,
});

const mapDispatchToProps = dispatch => ({
  updateInputValue: value => dispatch(updateInput(value)),
  updateOutputValue: value => dispatch(updateOutput(value)),
  onCurrencyClick: () => dispatch(toggleDropdown(FROM)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(From);
