import React from 'react';
import * as TYPES from 'prop-types';
import { connect } from 'react-redux';

import { BASE } from '../../constants/DataTypes';

import {
  Block,
  Currency,
  Control,
  Dropdown
} from '../../components/common';
import { Input } from '../../components/Base';

import { showDropdown, hideDropdown } from '../../actions/dropdown';
import { onInputChange } from '../../actions/input';
import { switchCurrency } from '../../actions/currencies';
import {
  getCurrency,
  getCurrenciesList,
  parseInput
} from '../../selectors';

Base.propTypes = {
  currency: TYPES.object.isRequired,
  currenciesList: TYPES.array.isRequired,
  isDropdownActive: TYPES.bool.isRequired,
  inputValue: TYPES.string.isRequired,
  hasWarning: TYPES.bool.isRequired,
  onInputChange: TYPES.func.isRequired,
  onCurrencyClick: TYPES.func.isRequired,
  onCurrencyListItemClick: TYPES.func.isRequired,
  onBackgroundClick: TYPES.func.isRequired
};

function Base({
  currency,
  currenciesList,
  isDropdownActive,
  inputValue,
  hasWarning,
  onInputChange,
  onCurrencyClick,
  onCurrencyListItemClick,
  onBackgroundClick
}) {
  return (
    <Block type='base'>
      <Control>
        <Currency
          { ...currency }
          hasWarning={ hasWarning }
          onClick={ onCurrencyClick }
        />
        <Input
          value={ inputValue }
          onChange={ onInputChange }
        />
      </Control>
      <Dropdown
        list={ currenciesList }
        isActive={ isDropdownActive }
        type={ BASE }
        onElementClick={ onCurrencyListItemClick }
        onBackgroundClick={ onBackgroundClick }
      />
    </Block>
  );
}

const mapStateToProps = ({ currencies }) => {
  const {
    list,
    base,
    input,
    isBaseOpen,
    hasWarning
  } = currencies;

  return {
    currency: (({ name = '', sign = '', value = '' }) => ({ name, sign, value }))(getCurrency(list, base)),
    currenciesList: getCurrenciesList(list),
    isDropdownActive: isBaseOpen,
    inputValue: parseInput(input),
    hasWarning
  };
};

const mapDispatchToProps = dispatch => ({
  onInputChange: value => dispatch(onInputChange(value)),
  onCurrencyClick: () => dispatch(showDropdown(BASE)),
  onCurrencyListItemClick: (id, type) => dispatch(switchCurrency(id, type)),
  onBackgroundClick: () => dispatch(hideDropdown())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Base);
