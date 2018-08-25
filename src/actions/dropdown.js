import * as actions from './actionCreators';
import { BASE, QUOTE } from '../constants/DataTypes';

const show = type => {
  switch (type) {
    case BASE:
      return actions.showBaseDropdown();
    case QUOTE:
      return actions.showQuoteDropdown();
    // no default
  }
};

export const showDropdown = type => dispatch => dispatch(show(type));

export const hideDropdown = () => dispatch => dispatch(actions.hideDropdown());
