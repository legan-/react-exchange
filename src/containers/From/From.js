import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FROM } from '../../constants/DataTypes';

import Currency from '../../components/common/Currency';
import Dropdown from '../Dropdown';

import { toggleDropdown, onInputChange } from '../../actions';
import { updateOutput } from '../../actions/actionCreators';
import { getCurrency, getCurrenciesList } from '../../selectors/currencies';

const From = ({
  currency,
  currenciesList,
  onInputChange,
  updateOutputValue,
  onCurrencyClick,
  isDropdownActive,
  currentInput,
  inputValue
}) => {
  const warning = Number(currentInput) > Number(currency.value) ? true : false;

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
          value={inputValue}
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
    value: PropTypes.string
  }).isRequired,
  currenciesList: PropTypes.array.isRequired,
  onInputChange: PropTypes.func.isRequired,
  updateOutputValue: PropTypes.func.isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  isDropdownActive: PropTypes.bool.isRequired,
  currentInput: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { list, from, input, isFromOpen } = state.currencies;

  return {
    currency: getCurrency(list, from),
    currenciesList: getCurrenciesList(list),
    isDropdownActive: isFromOpen,
    currentInput: input,
    inputValue: input === '0' ? '' : `-${input}`
  };
};

const mapDispatchToProps = dispatch => ({
  onInputChange: value => dispatch(onInputChange(value)),
  updateOutputValue: value => dispatch(updateOutput(value)),
  onCurrencyClick: () => dispatch(toggleDropdown(FROM))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(From);
