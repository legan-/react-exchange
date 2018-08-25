import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { QUOTE } from '../../constants/DataTypes';

import { Currency } from '../../components/common';
import { Exchange, Output, Rate } from '../../components/Quote';
import Dropdown from '../../components/Dropdown';

import { showDropdown, hideDropdown } from '../../actions/dropdown';
import { submitExchange } from '../../actions/submit';
import { switchCurrency } from '../../actions/currencies';
import { getCurrency, getCurrenciesList } from '../../selectors/currencies';

const Quote = ({
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
}) => (
  <div className="block quote-block">
    <Rate {...rate} />
    <div className="control">
      <Currency {...currency} warning={false} onClick={onCurrencyClick} />
      <Output output={output} />
    </div>
    <Dropdown
      list={currenciesList}
      active={isDropdownActive}
      type={QUOTE}
      onElementClick={onCurrencyListItemClick}
      onBackgroundClick={onBackgroundClick}
    />
    <Exchange {...exchange} onClick={onExchangeClick} />
  </div>
);

Quote.propTypes = {
  rate: PropTypes.shape({
    rate: PropTypes.string.isRequired,
    baseSign: PropTypes.string,
    quoteSign: PropTypes.string
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
    disabled: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
  onExchangeClick: PropTypes.func.isRequired,
  onCurrencyListItemClick: PropTypes.func.isRequired,
  onBackgroundClick: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { input, output, sending, warning, list, base, quote, isQuoteOpen } = state.currencies;

  const baseCurrency = getCurrency(list, base);
  const quoteCurrency = getCurrency(list, quote);

  return {
    currency: (({ name, sign, value }) => ({ name, sign, value }))(quoteCurrency),
    currenciesList: getCurrenciesList(list),
    isDropdownActive: isQuoteOpen,
    output: `${parseInt(output, 10) > 0 ? '+' : ''} ${output}`,
    exchange: {
      disabled: warning || sending || input === '0',
      text: sending ? 'Sending...' : 'Exchange'
    },
    rate: {
      rate: state.rates.rate || '0',
      baseSign: baseCurrency.sign,
      quoteSign: quoteCurrency.sign
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
