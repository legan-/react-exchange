import React from 'react';
import PropTypes from 'prop-types';

import Element from './Element';

const Dropdown = ({ list, active, type, onElementClick, onBackgroundClick }) =>
  active && (
    <div className="dropdown" onClick={() => onBackgroundClick()}>
      <ul>
        <p>Choose {type.toLowerCase()} currency:</p>
        {list.map(({ id, name, flag, value }) => (
          <Element
            key={id}
            name={name}
            flag={flag}
            value={value}
            onClick={() => onElementClick(id, type)}
          />
        ))}
      </ul>
    </div>
  );

Dropdown.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      sign: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  active: PropTypes.bool.isRequired,
  type: PropTypes.string,
  onElementClick: PropTypes.func.isRequired,
  onBackgroundClick: PropTypes.func.isRequired
};

export default Dropdown;
