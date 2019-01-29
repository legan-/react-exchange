import React from 'react';
import * as TYPES from 'prop-types';

Container.propTypes = {
  children: TYPES.node.isRequired,
  isDisplayed: TYPES.bool.isRequired
};

function Container({ children, isDisplayed }) {
  const className = `container ${ isDisplayed ? 'show' : 'hide' }`

  return (
    <div className={ className }>
      <h2>Exchange</h2>
      { children }
    </div>
  );
}

export default Container;
