import React from 'react';
import * as TYPES from 'prop-types';
import { connect } from 'react-redux';

import { QUOTE } from '../../constants/DataTypes';

import {
  Block,
  Currency,
  Control,
  Dropdown
} from '../../components/common';
import { ExchangeBtn, Output, Rate } from '../../components/Quote';

import { showDropdown, hideDropdown } from '../../actions/dropdown';
import { submitExchange } from '../../actions/submit';
import { switchCurrency } from '../../actions/currencies';
import {
  getCurrency,
  getCurrenciesList,
  parseOutput,
  pickBtnText
} from '../../selectors';

Quote.propTypes = {
  rate: TYPES.shape({
    rate: TYPES.string.isRequired,
    baseSign: TYPES.string.isRequired,
    quoteSign: TYPES.string.isRequired
  }).isRequired,
  currency: TYPES.shape({
    name: TYPES.string,
    sign: TYPES.string,
    value: TYPES.string
  }).isRequired,
  currenciesList: TYPES.array.isRequired,
  output: TYPES.string.isRequired,
  isDropdownActive: TYPES.bool.isRequired,
  exchange: TYPES.shape({
    isDisabled: TYPES.bool.isRequired,
    text: TYPES.string.isRequired
  }).isRequired,
  onCurrencyClick: TYPES.func.isRequired,
  onExchangeClick: TYPES.func.isRequired,
  onCurrencyListItemClick: TYPES.func.isRequired,
  onBackgroundClick: TYPES.func.isRequired
};

function Quote ({
  rate,
  currency,
  currenciesList,
  output,
  isDropdownActive,
  exchange,
  onCurrencyClick,
  onExchangeClick,
  onCurrencyListItemClick,
  onBackgroundClick
}) {
  return (
    <Block type='quote'>
      <Rate { ...rate } />
      <Control>
        <Currency
          { ...currency }
          onClick={ onCurrencyClick }
        />
        <Output output={ output } />
      </Control>
      <Dropdown
        list={ currenciesList }
        isActive={ isDropdownActive }
        type={ QUOTE }
        onElementClick={ onCurrencyListItemClick }
        onBackgroundClick={ onBackgroundClick }
      />
      <ExchangeBtn { ...exchange } onClick={ onExchangeClick } />
    </Block>
  );
}

const mapStateToProps = ({ currencies, rates }) => {
  const {
    input,
    output,
    isSending,
    hasWarning,
    list,
    base,
    quote,
    isQuoteOpen
  } = currencies;

  const baseCurrency = getCurrency(list, base);
  const quoteCurrency = getCurrency(list, quote);

  return {
    currency: (({ name = '', sign = '', value = '' }) => ({ name, sign, value }))(quoteCurrency),
    currenciesList: getCurrenciesList(list),
    isDropdownActive: isQuoteOpen,
    output: parseOutput(output),
    exchange: {
      isDisabled: hasWarning || isSending || input === '0',
      text: pickBtnText(isSending)
    },
    rate: {
      rate: rates.rate || '0',
      baseSign: baseCurrency.sign || '',
      quoteSign: quoteCurrency.sign || ''
    }
  };
};

const mapDispatchToProps = dispatch => ({
  onCurrencyClick: () => dispatch(showDropdown(QUOTE)),
  onExchangeClick: () => dispatch(submitExchange()),
  onCurrencyListItemClick: (id, type) => dispatch(switchCurrency(id, type)),
  onBackgroundClick: () => dispatch(hideDropdown())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quote);
