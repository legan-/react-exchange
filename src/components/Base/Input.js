import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ value, onChange }) => (
  <input className="input" type="text" placeholder="0" value={value} onChange={onChange} />
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
