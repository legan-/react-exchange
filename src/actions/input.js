import * as actions from './actionCreators';
import { getCurrency } from '../selectors/currencies';
import { calcAndUpdateOutput } from './output';

const formattedInput = input => {
  let value = input.replace(/[-[\]\s()<>{}"'`|/,;:~+=_!?@#£$€%^&*A-Za-zА-Яа-я]/g, '');

  const nulls = input.match(/[0]/g);
  if (nulls && nulls.length > 0) {
    value = value.replace(/^0+(?=[0-9])/g, '');
  }

  const dots = input.match(/[.]/g);
  if (dots && dots.length > 1) {
    value = value.replace(/.$/g, '');
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
  const value = e.target.value;
  const formattedValue = formattedInput(value);

  dispatch(actions.updateInput(formattedValue));
  dispatch(calcAndUpdateOutput());
  dispatch(checkBalance());
};

