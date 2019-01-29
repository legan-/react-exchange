import React from 'react';
import * as TYPES from 'prop-types';

Warning.propTypes = {
  message: TYPES.string.isRequired
};

function Warning({ message }) {
  return (
    <div className='warning-message'>
      { message }
    </div>
  );
}

export default Warning;
