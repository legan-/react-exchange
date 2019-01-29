import * as actions from './actionCreators';
import { getCurrency } from '../selectors';
import { calcAndUpdateOutput } from './output';

const formatInput = input => {
  let value = input.replace(/[-[\]\s()<>{}"'`|/,;:~+=_!?@#£$€%^&*A-Za-zА-Яа-я]/g, '');

  const nulls = input.match(/[0]/g);
  if (nulls && nulls.length > 0) {
    value = value.replace(/^0+(?=[0-9])/g, '');
  }

  const dots = input.match(/[.]/g);
  if (dots && dots.length > 1) {
    value = value.replace(/.$/g, '');
  }

  const parts = value.split('.');
  if (parts.length > 1 && parts[1].length > 2) {
    value = value.slice(0, value.length - 1);
  }

  return value || '0';
};

export const checkBalance = () => (dispatch, getState) => {
  const { list, base, input } = getState().currencies;
  const balance = Number(getCurrency(list, base).value);
  const value = Number(input);

  dispatch(actions.updateWarning(balance < value));
};

export const onInputChange = e => (dispatch, getState) => {
  const { warning, input } = getState().currencies;
  const value = e.target.value;
  const formattedInput = formatInput(value);

  if (!warning || formattedInput < input) {
    dispatch(actions.updateInput(formattedInput));
    dispatch(calcAndUpdateOutput());
    dispatch(checkBalance());
  }
};

