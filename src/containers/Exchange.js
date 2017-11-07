{import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCurrency } from '../reducers/currencies'
import { exchange } from '../actions'

const Exchange = ({ inputValue, balance, exchange }) => (
  <div
    className='exchange-container'
  >
    <button 
      className='exchange-btn'
      onClick={ () => exchange() }
      style={{ textAlign: 'center', margin: '10px 0' }}
      disabled={ inputValue === 0 || inputValue > balance ? 'disabled' : '' }
    >
      Exchange
    </button>
  </div>
)

Exchange.propTypes = {
  inputValue: PropTypes.number.isRequired,
  balance:    PropTypes.number.isRequired,
  exchange:   PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  inputValue: state.currencies.input,
  balance:    getCurrency(state.currencies.list, state.currencies.from).value || 0
})

export default connect(
  mapStateToProps,
  { exchange }
)(Exchange)