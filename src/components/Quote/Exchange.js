import React from 'react';
import PropTypes from 'prop-types';

const Exchange = ({ disabled, text, onClick }) => (
  <div className="exchange-container">
    <button className="exchange-btn" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  </div>
);

Exchange.propTypes = {
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Exchange;
