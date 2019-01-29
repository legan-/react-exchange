import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { QUOTE } from '../../constants/DataTypes';

import { Block, Currency, Control, Dropdown } from '../../components/common';
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
  rate: PropTypes.shape({
    rate: PropTypes.string.isRequired,
    baseSign: PropTypes.string.isRequired,
    quoteSign: PropTypes.string.isRequired
  }).isRequired,
  currency: PropTypes.shape({
    name: PropTypes.string,
    sign: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  currenciesList: PropTypes.array.isRequired,
  output: PropTypes.string.isRequired,
  isDropdownActive: PropTypes.bool.isRequired,
  exchange: PropTypes.shape({
    isDisabled: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  onExchangeClick: PropTypes.func.isRequired,
  onCurrencyListItemClick: PropTypes.func.isRequired,
  onBackgroundClick: PropTypes.func.isRequired
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
      <ExchangeBtn { ...exchange } onClick={ onExchangeClick } />
    </Block>
  );
}

const mapStateToProps = ({ currencies, rates }) => {
  const {
    input,
    output,
    sending,
    warning,
    list,
    base,
    quote,
    isQuoteOpen
  } = currencies;

  const baseCurrency = getCurrency(list, base);
  const quoteCurrency = getCurrency(list, quote);

  return {
    currency: (({ name, sign, value }) => ({ name, sign, value }))(quoteCurrency),
    currenciesList: getCurrenciesList(list),
    isDropdownActive: isQuoteOpen,
    output: parseOutput(output),
    exchange: {
      isDisabled: warning || sending || input === '0',
      text: pickBtnText(sending)
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
