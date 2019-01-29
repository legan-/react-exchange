import React from 'react';
import * as TYPES from 'prop-types';

Block.propTypes = {
  type: TYPES.stirng,
  children: TYPES.node.isRequired
};

Block.defaultProps = {
  type: 'base'
};

function Block({ children, type }) {
  return (
    <div className={ `block ${ type }-block` }>
      { children }
    </div>
  );
}

export default Block;