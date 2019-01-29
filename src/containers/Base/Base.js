import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { BASE } from '../../constants/DataTypes';

import { Block, Currency, Control, Dropdown } from '../../components/common';
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
  currency: PropTypes.object.isRequired,
  currenciesList: PropTypes.array.isRequired,
  isDropdownActive: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
  warning: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  onCurrencyListItemClick: PropTypes.func.isRequired,
  onBackgroundClick: PropTypes.func.isRequired
};

function Base({
  currency,
  currenciesList,
  isDropdownActive,
  inputValue,
  warning,
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
          warning={ warning }
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
};

const mapStateToProps = ({ currencies }) => {
  const {
    list,
    base,
    input,
    isBaseOpen,
    warning
  } = currencies;

  return {
    currency: (({ name, sign, value }) => ({ name, sign, value }))(getCurrency(list, base)),
    currenciesList: getCurrenciesList(list),
    isDropdownActive: isBaseOpen,
    inputValue: parseInput(input),
    warning
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
