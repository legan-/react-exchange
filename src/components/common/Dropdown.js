import React from 'react';
import * as TYPES from 'prop-types';

import Flag from 'react-country-flag';

Dropdown.propTypes = {
  list: TYPES.arrayOf(
    TYPES.shape({
      id: TYPES.number.isRequired,
      name: TYPES.string.isRequired,
      sign: TYPES.string.isRequired,
      flag: TYPES.string.isRequired,
      value: TYPES.string.isRequired
    })
  ).isRequired,
  isActive: TYPES.bool.isRequired,
  type: TYPES.string,
  onElementClick: TYPES.func.isRequired,
  onBackgroundClick: TYPES.func.isRequired
};

function Dropdown ({
  list,
  isActive,
  type,
  onElementClick,
  onBackgroundClick
}) {
  return isActive && (
    <div className='dropdown' onClick={ onBackgroundClick }>
      <ul>
        <p>
          { `Choose a ${ type.toLowerCase() } currency:` }
        </p>
        {
          list.map(({ id, name, flag, value }) => (
            <li key={ id } onClick={ () => onElementClick(id, type) }>
              <Flag code={ flag } svg />
              { `${ name }: ${ value }` }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Dropdown;
