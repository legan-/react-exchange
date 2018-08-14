import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FROM } from '../../constants/DataTypes';

import Element from '../../components/Dropdown/Element';

import { switchCurrency } from '../../actions';

const Dropdown = ({ list, active, type, onCurrencyClick }) => {
  let ul;

  const currencyType = type === FROM ? 'base' : 'quote';

  if (active) {
    ul = (
      <ul>
        <p>Choose {currencyType} currency:</p>
        {list.map(({ id, name, value }) => (
          <Element
            key={id}
            name={name}
            value={value}
            onCurrencyClick={() => onCurrencyClick(id, type)}
          />
        ))}
      </ul>
    );
  }
  return <div className="dropdown">{ul}</div>;
};

Dropdown.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      sign: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  active: PropTypes.bool.isRequired,
  type: PropTypes.string,
  onCurrencyClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onCurrencyClick: (id, type) => dispatch(switchCurrency(id, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dropdown);
