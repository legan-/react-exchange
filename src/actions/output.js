import * as actions from './actionCreators';

export const calcAndUpdateOutput = () => (dispatch, getState) => {
  const rate = getState().rates.rate;
  const input = getState().currencies.input;
  const output = Number((input * rate).toFixed(2));

  dispatch(actions.updateOutput(output));
};
