import React from 'react';
import PropTypes from 'prop-types';

const Currency = ({ name, sign, value, warning, onCurrencyClick }) => {
  const x = warning ? 'balance warning' : 'balance';

  return (
    <div>
      <div className="currency" onClick={onCurrencyClick}>
        {name}
      </div>
      <div className={x}>
        Balance: {sign}
        {value}
      </div>
    </div>
  );
};

Currency.propTypes = {
  name: PropTypes.string,
  sign: PropTypes.string,
  value: PropTypes.string,
  warning: PropTypes.bool,
  onCurrencyClick: PropTypes.func.isRequired,
};

export default Currency;
