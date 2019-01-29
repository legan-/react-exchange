import React from 'react';
import * as TYPES from 'prop-types';

ExchangeBtn.propTypes = {
  isDisabled: TYPES.bool.isRequired,
  text: TYPES.string.isRequired,
  onClick: TYPES.func.isRequired
};

function ExchangeBtn({ isDisabled, text, onClick }) {
  return (
    <div className='exchange-container'>
      <button className='exchange-btn' disabled={ isDisabled } onClick={ onClick }>
        { text }
      </button>
    </div>
  );
}

export default ExchangeBtn;
