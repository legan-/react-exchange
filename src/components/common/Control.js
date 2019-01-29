import React from 'react';
import * as TYPES from 'prop-types';

Control.propTypes = {
  children: TYPES.node.isRequired
};

function Control({ children }) {
  return (
    <div className='control'>
      { children }
    </div>
  );
}

export default Control;