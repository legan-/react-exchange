import React from 'react';
import * as TYPES from 'prop-types';

Container.propTypes = {
  children: TYPES.node.isRequired
};

function Container({ children }) {
  return (
    <div className='container'>
      <h2>Exchange</h2>
      { children }
    </div>
  );
}

export default Container;
