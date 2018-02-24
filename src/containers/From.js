import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FROM } from '../constants/DataTypes';

import Currency from '../components/Currency';
import Dropdown from './Dropdown';

import { updateInput, updateOutput, toggleDropdown } from '../actions';
import { getCurrency, getCurrenciesList, getFormattedInput, getFormattedOutput } from '../reducers/currencies';


const From = ({ currency, currenciesList, updateInput, updateOutput, toggleDropdown, isDropdownActive, formattedInput, formattedOutput, currentInput }) => {
  let input;

  // todo:: refactor this
  const inputOnChange = e => {
    const value = e.target.value;
    const formattedValue = formattedInput(value);
    const number = Number(formattedValue);

    updateInput(formattedValue);

    if (value === '-' || value === '') {
      updateOutput(0);
    } else {
      if (value.split('')[1] === '0' || value.length - formattedValue.length < 2) {
        updateOutput(formattedOutput(number));
      }
    }
  }

  const warning = currency.value < currentInput ? true : false;

  const compareValues = currentInput === 0 ? '' : '-' + currentInput;

  return (
    <div
      className='from-block'
    >
      <Currency
        name={ currency.name }
        sign={ currency.sign }
        value={ currency.value }
        warning= { warning }
        onCurrencyClicked={ () => toggleDropdown(FROM) }
      />
      <Dropdown 
        list={ currenciesList }
        active={ isDropdownActive }
        type={ FROM }
      />
      <div
        className='input'
      >
        <input
          type='text'
          placeholder='0'
          ref={ node => { input = node } }
          value={ compareValues }
          onChange={ inputOnChange }
        />
      </div>
    </div>
  );
}

From.propTypes = {
  currency: PropTypes.shape({
    id:     PropTypes.number,
    name:   PropTypes.string,
    sign:   PropTypes.string,
    value:  PropTypes.number
  }).isRequired,
  currenciesList:   PropTypes.array.isRequired,
  updateInput:      PropTypes.func.isRequired,
  updateOutput:     PropTypes.func.isRequired,
  toggleDropdown:   PropTypes.func.isRequired,
  isDropdownActive: PropTypes.bool.isRequired,
  formattedInput:   PropTypes.func.isRequired,
  formattedOutput:  PropTypes.func.isRequired,
  currentInput:     PropTypes.number.isRequired
}

// add From.defaultProps
// https://github.com/facebook/react/issues/3725

const mapStateToProps = state => ({
  currency:         getCurrency(state.currencies.list, state.currencies.from),
  currenciesList:   getCurrenciesList(state.currencies.list),
  isDropdownActive: state.currencies.isFromOpened,
  formattedInput:   getFormattedInput,
  formattedOutput:  getFormattedOutput(state),
  currentInput:     state.currencies.input
});

export default connect(
  mapStateToProps,
  { 
    updateInput,
    updateOutput,
    toggleDropdown
  }
)(From);