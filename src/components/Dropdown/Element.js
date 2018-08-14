import React from 'react';
import PropTypes from 'prop-types';

const Element = ({ name, value, onCurrencyClick }) => (
  <div>
    <li onClick={onCurrencyClick}>
      {name} - {value}
    </li>
  </div>
);

Element.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onCurrencyClick: PropTypes.func.isRequired,
};

export default Element;
