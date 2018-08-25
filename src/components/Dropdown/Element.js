import React from 'react';
import PropTypes from 'prop-types';
import { Flag } from 'semantic-ui-react';

const Element = ({ name, value, flag, onClick }) => (
  <li onClick={onClick}>
    <Flag name={flag} />
    {name} - {value}
  </li>
);

Element.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Element;
