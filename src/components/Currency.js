import React from 'react';
import PropTypes from 'prop-types';


const Currency = ({ name, sign, value, warning, onCurrencyClicked }) => {
  const x = warning ? 'balance warning' : 'balance';

  return (
    <div > 
      <div
        className='currency'
        onClick={ onCurrencyClicked }
      >
        { name }
      </div>
      <div
        className={ x }
      >
        Balance: { sign }{ value }
      </div>
    </div>
  );
}

Currency.propTypes = {
  name:              PropTypes.string,
  sign:              PropTypes.string,
  value:             PropTypes.number,
  warning:           PropTypes.bool,
  onCurrencyClicked: PropTypes.func.isRequired
}

export default Currency;