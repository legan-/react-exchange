import React from 'react';
import * as TYPES from 'prop-types';

Currency.propTypes = {
  name: TYPES.string,
  sign: TYPES.string,
  value: TYPES.string,
  warning: TYPES.bool,
  onClick: TYPES.func.isRequired
};

Currency.defaultProps = {
  warning: false
};

function Currency({ name, sign, value, warning, onClick }) {
  const className = `balance ${ warning ? 'warning' : '' }`;

  return (
    <div>
      <div className='currency' onClick={ onClick }>
        { name }
      </div>
      <div className={ className }>
        Balance: { sign }
        { value }
      </div>
    </div>
  );
};

export default Currency;
