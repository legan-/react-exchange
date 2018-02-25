import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FROM } from '../constants/DataTypes';

import DropdownElement from '../components/DropdownElement';

import { switchCurrency } from '../actions';


const Dropdown = ({ list, active, type, switchCurrency }) => {
  let ul;

  const currencyType = type === FROM ? 'base' : 'quote'

  if (active) {
    ul = (
      <ul>
        <p>
          Choose { currencyType } currency:
        </p>
        { list.map(currency =>
          <DropdownElement
            key={ currency.id }
            name={ currency.name }
            value={ currency.value }
            onCurrencyClicked={ () => switchCurrency(currency.id, type) }
          />
        ) }
      </ul>
    );
  }
  return (
    <div className='dropdown'>
      { ul }
    </div>
  );
}

Dropdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id:     PropTypes.number.isRequired,
    name:   PropTypes.string.isRequired,
    sign:   PropTypes.string.isRequired,
    value:  PropTypes.number.isRequired
  })).isRequired,
  active:   PropTypes.bool.isRequired,
  type:     PropTypes.string,
  switchCurrency: PropTypes.func.isRequired
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { switchCurrency }
)(Dropdown);