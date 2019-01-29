import React from 'react';
import * as TYPES from 'prop-types';

Input.propTypes = {
  value: TYPES.string.isRequired,
  onChange: TYPES.func.isRequired
};

function Input ({ value, onChange }) {
  return (
    <input
      className='input'
      type='text'
      placeholder='0'
      value={ value }
      onChange={ onChange }
    />
  ); 
}

export default Input;
