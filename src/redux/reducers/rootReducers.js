import { combineReducers } from 'redux';
import currencyReducer from '../Currency/reducer';
import cartReducer from '../Cart/reducer';

const rootReducer = combineReducers({
  currency: currencyReducer,
  cart: cartReducer
});

export default rootReducer;
