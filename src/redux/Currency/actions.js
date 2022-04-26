import * as actionTypes from './actionTypes';

export const changeCurrency = (data) => {
  return {
    type: actionTypes.CHANGE_CURRENCY,
    payload: data
  };
};
