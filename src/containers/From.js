import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FROM } from '../constants/DataTypes'

import Currency from '../components/Currency'
import Dropdown from './Dropdown'

import { updateOutput, toggleDropdown } from '../actions'
import { getCurrency, getCurrenciesList, getFormattedValue } from '../reducers/currencies'


const From = ({ currency, currenciesList, updateOutput, toggleDropdown, isDropdownActive, formattedValue, currentInput }) => {
  let input

  const inputOnChange = () => {
    const value = formattedValue(input.value)
    const number = Number(value)

    if (input.value === '-') {
      updateOutput(0)
      input.value = ''
    } else {
      if (input.value.split('')[1] === '0' || input.value.length - value.length < 2) {
        updateOutput(number)
      }
      input.value = '-' + value
    }
  }

  const warning = currency.value < currentInput ? true : false

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
          onChange={ inputOnChange }
        />
      </div>
    </div>
  )
}

From.propTypes = {
  currency: PropTypes.shape({
    id:     PropTypes.number,
    name:   PropTypes.string,
    sign:   PropTypes.string,
    value:  PropTypes.number
  }).isRequired,
  currenciesList:   PropTypes.array.isRequired,
  updateOutput:     PropTypes.func.isRequired,
  toggleDropdown:   PropTypes.func.isRequired,
  isDropdownActive: PropTypes.bool.isRequired,
  formattedValue:   PropTypes.func.isRequired,
  currentInput:     PropTypes.number.isRequired
}

// add From.defaultProps
// https://github.com/facebook/react/issues/3725

const mapStateToProps = state => ({
  currency:         getCurrency(state.currencies.list, state.currencies.from),
  currenciesList:   getCurrenciesList(state.currencies.list),
  isDropdownActive: state.currencies.isFromOpened,
  formattedValue:   getFormattedValue,
  currentInput:     state.currencies.input
})

export default connect(
  mapStateToProps,
  { updateOutput, toggleDropdown }
)(From)