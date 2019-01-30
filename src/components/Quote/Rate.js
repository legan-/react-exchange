import React from 'react';
import * as TYPES from 'prop-types';

Rate.propTypes = {
  rate: TYPES.string.isRequired,
  baseSign: TYPES.string.isRequired,
  quoteSign: TYPES.string.isRequired
};

function Rate({ rate, baseSign, quoteSign }) {
  return (
    <div className='rate-container'>
      <div className='rate'>
        { `${ baseSign }1 = ${ quoteSign }` }
        { rate.slice(0, 4) }
        <span>{ rate.slice(-2) }</span>
      </div>
    </div>
  );
}

export default Rate;
