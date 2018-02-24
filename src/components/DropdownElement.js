import React from 'react';
import PropTypes from 'prop-types';


const DropdownElement = ({ name, value, onCurrencyClicked }) => (
  <div>
    <li
      style={{ cursor: 'pointer' }}
      onClick={ onCurrencyClicked }
    >
      { name } - { value }
    </li>
  </div>
);

DropdownElement.propTypes = {
  name:              PropTypes.string.isRequired,
  value:             PropTypes.number.isRequired,
  onCurrencyClicked: PropTypes.func.isRequired,
}

export default DropdownElement;