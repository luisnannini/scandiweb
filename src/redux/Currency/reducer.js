import { CHANGE_CURRENCY } from './actionTypes';

const currencyReducer = (state = '$', action) => {
  switch (action.type) {
    case CHANGE_CURRENCY: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default currencyReducer;
