import getJSON from 'get-json'

import internal from '../api/internal'
import * as types from '../constants/ActionTypes'

import { CURRENCIES, RATES, FROM, TO } from '../constants/DataTypes'


const receive = (type, data, state = {}) => {
  switch (type) {
    case CURRENCIES:
      return {
        type: types.RECEIVE_CURRENCIES,
        currencies: data
      }
    case RATES:

      const name = state.currencies.list[state.currencies.to].name
      const x = ((data.rates[name]) + Math.random()/30).toFixed(6)
      const rates = ({ ...data.rates, [name]: Number(x) })

      // [!] replace 3 lines above with line below to fake-update
      // const rates = data.rates

      return {
        type:  types.RECEIVE_RATES,
        rates: rates,
        input: state.currencies.input,
        to:    state.currencies.list[state.currencies.to].name
      }
    // no default
  }
}

const getRates = (base) => (dispatch, getState) => {
  getJSON(`http://api.fixer.io/latest?base=${base}&symbols=USD,GBP,EUR,RUB`, (err, res) => {
    if (res) {
      dispatch(receive(RATES, res, getState()))
    }
  })
}

const ratesListener = () => (dispatch, getState) => {
  const update = (time) => {
    const base = getState().currencies.list[getState().currencies.from].name

    dispatch(getRates(base))
    setTimeout(() => {
      if (getState().rates.update === time) {
        update(getState().rates.update)
      }
    }, 10000)
  }
  update(getState().rates.update)
}

const setCurrencies = data => dispatch => {
  const length = Object.keys(data).length

  if (length < 2) {
    dispatch({ type: types.FEW_CURRENCIES, currencies: data })
  } else {
    dispatch({ type: types.SET_CURRENCIES, currencies: data })
    dispatch(ratesListener())
  }
}

export const getCurrencies = () => dispatch => {
  internal.getData(data => {
    dispatch(receive(CURRENCIES, data))
    dispatch(setCurrencies(data))
  })
}

export const updateOutput = value => (dispatch, getState) => {
  const currency = {
    input: value,
    rate:  getState().rates.rate
  }
  return dispatch({ type: types.UPDATE_OUTPUT, currency })
}

const toggleBy = type => {
  switch (type) {
    case FROM:
      return {
        type: types.TOGGLE_FROM_DROPDOWN,
      }
    case TO:
      return {
        type: types.TOGGLE_TO_DROPDOWN,
      }
    // no default
  }
}

export const toggleDropdown = type => dispatch =>
  dispatch(toggleBy(type))


const switchCurrencyBy = (id, type, state) => {
  const c = state.currencies
  switch (type) {
    case FROM:
      const to = c.to === id ? c.list[c.from] : c.list[c.to]
      return {
        type: types.SWITCH_FROM_CURRENCY,
        from: c.list[id],
        to: to,
        state: state
      }
    case TO:
      const from = c.from === id ? c.list[c.to] : c.list[c.from]
      return {
        type: types.SWITCH_TO_CURRENCY,
        from: from,
        to: c.list[id],
        state: state
      }
    // no default
  }
}

export const switchCurrency = (id, type) => (dispatch, getState) => {
  dispatch(switchCurrencyBy(id, type, getState()))
  dispatch(ratesListener())
}

export const exchange = () => (dispatch, getState) => {
  const c = getState().currencies
  const request = {
    from: {
      currencyId: c.from,
      value:      c.input
    },
    to: {
      currencyId: c.to,
      value:      c.output
    }
  }
  dispatch({
    type: types.EXCHANGE_REQUEST
  })
  internal.exchange(request, () => {
    dispatch({
      type: types.EXCHANGE_SUCCESS,
    })
  })
}
