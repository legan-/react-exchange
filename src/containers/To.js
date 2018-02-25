import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TO } from '../constants/DataTypes';

import Currency from '../components/Currency';
import Rate from './Rate';
import Dropdown from './Dropdown';
import Exchange from './Exchange';

import { toggleDropdown } from '../actions';
import { getCurrency, getCurrenciesList } from '../reducers/currencies';


const To = ({ currency, currenciesList, output, toggleDropdown, isDropdownActive }) => (
  <div className='block to-block'>
    <Rate />
    <div className='control'>
      <Currency
        name={ currency.name }
        sign={ currency.sign }
        value={ currency.value }
        warning={ false }
        onCurrencyClicked={ () => toggleDropdown(TO) }
      />
      <div className='output'>
        { output ? `+ ${ output }` : 0 }
      </div>
    </div>
    <Dropdown 
      list={ currenciesList }
      active={ isDropdownActive }
      type={ TO }
    />
    <Exchange />
  </div>
);

To.propTypes = {
  currency: PropTypes.shape({
    id:     PropTypes.number,
    name:   PropTypes.string,
    sign:   PropTypes.string,
    value:  PropTypes.number
  }).isRequired,
  currenciesList:   PropTypes.array.isRequired,
  output:           PropTypes.number.isRequired,
  toggleDropdown:   PropTypes.func.isRequired,
  isDropdownActive: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  currency:         getCurrency(state.currencies.list, state.currencies.to), 
  currenciesList:   getCurrenciesList(state.currencies.list), 
  isDropdownActive: state.currencies.isToOpened,
  output:           state.currencies.output
});

export default connect(
  mapStateToProps,
  { toggleDropdown }
)(To);