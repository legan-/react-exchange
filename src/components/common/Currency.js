import React from 'react';
import * as TYPES from 'prop-types';

Currency.propTypes = {
  name: TYPES.string.isRequired,
  sign: TYPES.string.isRequired,
  value: TYPES.string.isRequired,
  hasWarning: TYPES.bool,
  onClick: TYPES.func.isRequired
};

Currency.defaultProps = {
  hasWarning: false
};

function Currency({ name, sign, value, hasWarning, onClick }) {
  const className = `balance ${ hasWarning ? 'warning' : '' }`;

  return (
    <div>
      <div className='currency' onClick={ onClick }>
        { name }
      </div>
      <div className={ className }>
        { `Balance: ${ sign }` }
        { value }
      </div>
    </div>
  );
}

export default Currency;
