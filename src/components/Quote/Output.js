import React from 'react';
import * as TYPES from 'prop-types';

Output.propTypes = {
  output: TYPES.string.isRequired
};

function Output({ output }) {
  return <div className='output'>{ output }</div>;
}

export default Output;
