import _settings from './user_currencies.json'

const TIMEOUT = 200

export default {
	getData: 	(d, timeout) => setTimeout(() => d(_settings), timeout || TIMEOUT),
	exchange: (payload, d, timeout) => setTimeout(() => d(), timeout || TIMEOUT)
}